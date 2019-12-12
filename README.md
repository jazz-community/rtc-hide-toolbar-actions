![](https://github.com/jazz-community/rtc-hide-toolbar-actions/workflows/npm%20build/badge.svg)

# Hide Work Item Actions

Do you want to prevent users from using some of the actions in the work item editor? Maybe there is a type of work item that people shouldn't be able to copy or move to a different project area. Or maybe you just don't need all of the built-in actions and would like to hide some for a cleaner interface. This plugin enables you to achieve these goals.

Using this plugin you can hide built-in work item actions. The plugin can be configured per project area and work item type to give you full control over what is hidden and when.

Before:
![Screenshot Before](https://github.com/jazz-community/rtc-hide-toolbar-actions/blob/master/documentation/toolbar-actions-before.png)

After: (with "copy", "createChild", and "move" buttons removed)
![Screenshot After](https://github.com/jazz-community/rtc-hide-toolbar-actions/blob/master/documentation/toolbar-actions-after.png)

## Configuration

This plugin will not make any changes to the visible actions without a configuration file. The configuration file needs to be uploaded to the process attachments. Using the configuration file it is possible to hide different actions based on the work item type. Since the configuration file is stored in the process attachments it will only affect the work items within that process. The process can be a project area or a project area template. If uploaded to a template, the configuration will be valid for all project areas that inherit from that template.

### Instructions

- Create a json text file named: `workitem_hide_toolbar_actions.json`
- Copy the following json into the file:

```json
{
  "defect": {
    "refresh": false,
    "copyIdAndSummary": false,
    "moveOrCopy": false,
    "subscribe": false,
    "createChild": false,
    "copy": false,
    "findDuplicates": false
  },
  "some.other.workitem.id": {
    "copy": true
  }
}
```

- Replace `"defect"` with the id of the work item type that you want to use
  - Optionally, add additional sections to enable for multiple work item types (e.g. `"some.other.workitem.id"`)
- Set the value to `true` for the actions that you want to be hidden (actions with the value `false` can also be omitted from the configuration altogether)
- Save the file and upload it to the process attachments
  - [See the instructions from IBM on how to edit process attachments](https://jazz.net/help-dev/clm/index.jsp?topic=%2Fcom.ibm.jazz.platform.doc%2Ftopics%2Ft_add_attachment_process.html)
- Refresh your browser to see the actions now missing in the work item editor (you might need to clear the browser cache to see the changes right away)

## Setup

### Download

You can find the latest release on the [releases page of this repository](https://github.com/jazz-community/rtc-hide-toolbar-actions/releases).

### Installation

Deploy just like any other update site:

1. Extract the `com.siemens.bt.jazz.workitemeditor.rtcHideToolbarActions_updatesite.ini` **file** from the zip file to the `server/conf/ccm/provision_profiles` directory
2. Extract the `com.siemens.bt.jazz.workitemeditor.rtcHideToolbarActions_updatesite` **folder** to the `server/conf/ccm/sites` directory
3. Restart the server

### Updating an existing installation

1. Request a server reset in **one** of the following ways:
   - If the server is currently running, call `https://server-address/ccm/admin/cmd/requestReset`
   - Navigate to `https://server-address/ccm/admin?internaltools=true` so you can see the internal tools (on the left in the side-pane). Click on `Server Reset` and press the `Request Server Reset` button
   - If your server is down, you can delete the ccm `built-on.txt` file. Liberty packed with 6.0.3 puts this file in a subfolder of `server/liberty/servers/clm/workarea/org.eclipse.osgi/**/ccm`. The easiest way to locate the file is by using your operating system's search capabilities.
2. Delete previously deployed updatesite folder
3. Follow the file extraction steps from the section above
4. Restart the server

## Contributing

Please use the [Issue Tracker](https://github.com/jazz-community/rtc-hide-toolbar-actions/issues) of this repository to report issues or suggest enhancements.

For general contribution guidelines, please refer to [CONTRIBUTING.md](https://github.com/jazz-community/welcome/blob/master/CONTRIBUTING.md).

## Licensing

Copyright (c) Siemens AG. All rights reserved.
Licensed under the [MIT](https://github.com/jazz-community/rtc-hide-toolbar-actions/blob/master/LICENSE) License.
