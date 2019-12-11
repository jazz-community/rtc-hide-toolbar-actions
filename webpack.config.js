const DisableOutputWebpackPlugin = require("disable-output-webpack-plugin");
const JazzUpdateSitePlugin = require("jazz-update-site-webpack-plugin");
const RemovePlugin = require("remove-files-webpack-plugin");
const core = require("@actions/core");
const moment = require("moment");
const packageJson = require("./package.json");

module.exports = env => {
  const timestamp = moment().format("[_]YYYYMMDD[-]HHmm");
  const version =
    (typeof env !== "undefined" && packageJson.version + "_" + env.buildUUID) ||
    packageJson.version + timestamp;
  const projectId = "com.siemens.bt.jazz.workitemeditor.rtcHideToolbarActions";
  const config = {
    entry: {
      app: "./index.js"
    },
    plugins: [
      new DisableOutputWebpackPlugin(),
      new JazzUpdateSitePlugin({
        appType: "ccm",
        projectId: projectId,
        acceptGlobPattern: ["resources/**", "META-INF/**", "plugin.xml"],
        projectInfo: {
          author: packageJson.author,
          copyright: packageJson.author,
          description: packageJson.description,
          license: packageJson.license,
          version: version
        }
      }),
      new RemovePlugin({
        before: {
          root: __dirname,
          test: [
            {
              folder: "./",
              method: filePath => {
                return new RegExp(
                  /com\.siemens\.bt\.jazz\.workitemeditor\.rtcHideToolbarActions.*\.zip$/,
                  "i"
                ).test(filePath);
              }
            }
          ]
        },
        after: {
          root: __dirname,
          include: ["dist"]
        }
      })
    ]
  };

  // Set the output file name for use in GitHub Actions
  core.exportVariable("OUTPUT_FILE", `${projectId}_${version}.zip`);

  return config;
};
