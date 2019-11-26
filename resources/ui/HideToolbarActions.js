define([
  "dojo/_base/declare",
  "dojo/dom-construct",
  "dojo/query",
  "dojo/i18n!com.ibm.team.workitem.web/ui/internal/nls/WorkItemEditorMessages",
  "com.ibm.team.workitem.web.ui2.internal.action.AbstractAction",
  "dojo/domReady!"
], function(declare, domConstruct, query, WorkItemEditorMessages) {
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

      // Call the inherited constructor
      constructor: function(params) {
        this.inherited(arguments);

        this._initializeTitleValues();
      },

      // Always hide the action
      isVisible: function(params) {
        return false;
      },

      // Always disable the action
      isEnabled: function(params) {
        return false;
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

      // Runs the handler when the next readonly changed event is published
      _subscribeToReadonlyChanged: function(handler) {
        var subscription = dojo.subscribe(
          this.workItemReadonlyChangedEventName,
          this,
          function() {
            dojo.unsubscribe(subscription);
            handler.call(this);
          }
        );
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
