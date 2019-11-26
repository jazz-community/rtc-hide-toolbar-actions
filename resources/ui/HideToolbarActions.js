define([
  "dojo/_base/declare",
  "dojo/dom-construct",
  "dojo/query",
  "com.ibm.team.workitem.web.ui2.internal.action.AbstractAction",
  "dojo/domReady!"
], function(declare, domConstruct, query) {
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
      },

      // Always hide the action
      isVisible: function(params) {
        return false;
      },

      // Always disable the action
      isEnabled: function(params) {
        return false;
      },

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
