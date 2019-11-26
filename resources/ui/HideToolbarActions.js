define([
  "dojo/_base/declare",
  "dojo/dom-construct",
  "dojo/query",
  "dojo/request/xhr",
  "dojo/i18n!com.ibm.team.workitem.web/ui/internal/nls/WorkItemEditorMessages",
  "com.ibm.team.workitem.web.ui2.internal.action.AbstractAction",
  "dojo/domReady!"
], function(declare, domConstruct, query, xhr, WorkItemEditorMessages) {
  // Note that all of the above imports of ibm classes will log an error to the console but the classes are still loaded.
  // Using dojo.require doesn't log an error but also doesn't require the module when using AMD syntax.

  // Extend the AbstractAction class
  return declare(
    "com.siemens.bt.jazz.workitemeditor.rtcHideToolbarActions.ui.HideToolbarActions",
    com.ibm.team.workitem.web.ui2.internal.action.AbstractAction,
    {
      workItemReadonlyChangedEventName: "workitem/readonly/changed",
      hidableToolbarActions: {
        refresh: {
          titleNames: ["titleRefreshWorkItem"],
          titleValues: []
        },
        copyIdAndSummary: {
          titleNames: ["titleCopyIdAndSummary"],
          titleValues: []
        },
        moveOrCopy: {
          titleNames: ["titleMoveCopy"],
          titleValues: []
        },
        subscribe: {
          titleNames: ["titleSubscribeMe", "titleUnsubscribeMe"],
          titleValues: []
        },
        createChild: {
          titleNames: ["titleCreateChild"],
          titleValues: []
        },
        copy: {
          titleNames: ["titleCreateCopy"],
          titleValues: []
        },
        findDuplicates: {
          titleNames: ["titleFindPotentialDuplicates"],
          titleValues: []
        }
      },
      configFileLoaded: false,
      workItemEditorReady: false,
      configFileName: "workitem_hide_toolbar_actions.json",
      configFileUrl: null,
      contentServiceUrl: null,
      projectAreaId: null,
      config: null,

      // Call the inherited constructor
      constructor: function(params) {
        this.inherited(arguments);

        this._initializeConfigFileUrl();
        this._initializeTitleValues();

        this._getConfig(this._loadedCallback);
        this._subscribeToReadonlyChanged(this._loadedCallback);
      },

      // Always hide the action
      isVisible: function(params) {
        return false;
      },

      // Always disable the action
      isEnabled: function(params) {
        return false;
      },

      // Get the config file url using the current project area id and the config file name
      _initializeConfigFileUrl: function() {
        this.contentServiceUrl =
          net.jazz.ajax._contextRoot +
          "/service/com.ibm.team.workitem.common.internal.model.IImageContentService/processattachment";
        this.projectAreaId = this.workingCopy.getValue({
          path: ["attributes", "projectArea", "id"]
        });
        this.configFileUrl =
          this.contentServiceUrl +
          "/" +
          this.projectAreaId +
          "/" +
          this.configFileName;
      },

      // Get the locale specific titles for the hidable toolbar actions
      _initializeTitleValues: function() {
        for (var configActionName in this.hidableToolbarActions) {
          if (this.hidableToolbarActions.hasOwnProperty(configActionName)) {
            var hidableToolbarAction = this.hidableToolbarActions[
              configActionName
            ];
            hidableToolbarAction.titleNames.forEach(function(titleName) {
              var titleValue = WorkItemEditorMessages[titleName];

              if (titleValue) {
                hidableToolbarAction.titleValues.push(titleValue);
              }
            });
          }
        }
      },

      // Get the config file from the process attachments
      // Sets the config property and calls the callback function on success
      _getConfig: function(callback) {
        var self = this;
        xhr
          .get(this.configFileUrl, {
            handleAs: "json",
            headers: {
              Accept: "application/json"
            }
          })
          .then(
            function(response) {
              var workItemType = self.workingCopy.getValue({
                path: ["attributes", "workItemType", "id"]
              });

              if (response && response[workItemType]) {
                self.configFileLoaded = true;
                self.config = response[workItemType];

                callback.call(self);
              } else {
                console.log(
                  "No hidden toolbar actions configured for this process + work item type. No toolbar actions will be hidden."
                );
              }
            },
            function(error) {
              console.log(
                "No '" +
                  self.configFileName +
                  "' file found in the process attachments. No toolbar actions will be hidden."
              );
            }
          );
      },

      // Runs the handler when the next readonly changed event is published
      _subscribeToReadonlyChanged: function(handler) {
        var self = this;
        var subscription = dojo.subscribe(
          this.workItemReadonlyChangedEventName,
          this,
          function() {
            dojo.unsubscribe(subscription);
            self.workItemEditorReady = true;
            handler.call(self);
          }
        );
      },

      // Hide the buttons when the config is loaded and the work item editor is ready
      _loadedCallback: function() {
        if (this.configFileLoaded && this.workItemEditorReady) {
          // remove buttons
        }
      },

      // Removes a toolbar action button from the dom after finding it by the value of it's title attribute
      _removeButtonByTitle: function(buttonTitle) {
        query(
          ".com-ibm-team-workItem-workItemEditorHeader .jazz-ui-Toolbar " +
            ".jazz-ui-toolbar-Button .button[title='" +
            buttonTitle +
            "']"
        ).forEach(function(node) {
          domConstruct.destroy(node.parentElement);
        });
      }
    }
  );
});
