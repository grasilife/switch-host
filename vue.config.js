module.exports = {
  publicPath: "/",
  outputDir: "chrome-extension",
  lintOnSave: true,
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 3001,
    https: false,
    hotOnly: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      "/rest": {
        target: "http://0.0.0.0",
        changeOrigin: true,
        pathRewrite: {
          "^/rest": ""
        }
        // cookiePathRewrite: {
        //   "/iov/subject": "/"
        // },
        // cookieDomainRewrite: {}
      }
    }
  },
  pages: {
    setting: {
      entry: "src/setting/main.js", // page 的入口
      template: "public/index.html", // 模板来源
      filename: "setting.html" // 在 dist/index.html 的输出
    },
    popup: {
      entry: "src/popup/main.js",
      template: "public/index.html",
      filename: "popup.html"
    }
  },
  productionSourceMap: false,
};
