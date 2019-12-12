![](https://github.com/MartinBenninger/rtc-hide-toolbar-actions/workflows/npm%20build/badge.svg)

# Hide Work Item Actions
Do you want to prevent users from using some of the actions in the work item editor? Maybe there is a type of work item that people shouldn't be able to copy or move to a different project area. Or maybe you just don't need all of the built-in actions and would like to hide some for a cleaner interface. This plugin enables you to achieve these goals.

Using this plugin you can hide built-in work item actions. The plugin can be configured per project area and work item type to give you full control over what is hidden and when.

(add screenshot: before -> after)

## Configuration
todo

## Setup

### Download
You can find the latest release on the [releases page of this repository](https://github.com/MartinBenninger/rtc-hide-toolbar-actions/releases).

### Installation
Deploy just like any other update site:

1. Extract the `com.siemens.bt.jazz.workitemeditor.rtcHideToolbarActions_updatesite.ini` **file** from the zip file to the `server/conf/ccm/provision_profiles` directory
2. Extract the `com.siemens.bt.jazz.workitemeditor.rtcHideToolbarActions_updatesite` **folder** to the `server/conf/ccm/sites` directory
3. Restart the server

### Updating an existing installation
1. Request a server reset in **one** of the following ways:
    * If the server is currently running, call `https://server-address/ccm/admin/cmd/requestReset`
    * Navigate to `https://server-address/ccm/admin?internaltools=true` so you can see the internal tools (on the left in the side-pane). Click on `Server Reset` and press the `Request Server Reset` button
    * If your server is down, you can delete the ccm `built-on.txt` file. Liberty packed with 6.0.3 puts this file in a subfolder of `server/liberty/servers/clm/workarea/org.eclipse.osgi/**/ccm`. The easiest way to locate the file is by using your operating system's search capabilities.
2. Delete previously deployed updatesite folder
3. Follow the file extraction steps from the section above
4. Restart the server

## Contributing
Please use the [Issue Tracker](https://github.com/MartinBenninger/rtc-hide-toolbar-actions/issues) of this repository to report issues or suggest enhancements.

For general contribution guidelines, please refer to [CONTRIBUTING.md](https://github.com/jazz-community/welcome/blob/master/CONTRIBUTING.md).

## Licensing
Copyright (c) Siemens AG. All rights reserved.  
Licensed under the [MIT](https://github.com/MartinBenninger/rtc-hide-toolbar-actions/blob/master/LICENSE) License.
