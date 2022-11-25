const { defineConfig } = require("@vue/cli-service");

const plugins = [];

if (process.env.NODE_ENV === "production") {
  const { join } = require("path");
  const PrerenderPlugin = require("prerender-spa-plugin-next");

  plugins.unshift(
    new PrerenderPlugin({
      staticDir: join(__dirname, "dist"),
      routes: ["/"],
      renderAfterDocumentEvent: "render-event",
    })
  );
}

module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "OnixBase",
    themeColor: "#FFFFFF",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    workboxOptions: {
      exclude: [/index\.html$/],
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
         @import '~@/scss/_colors.scss';
         `,
      },
    },
  },
  configureWebpack(config) {
    config.plugins = [...config.plugins, ...plugins];
  },
});
