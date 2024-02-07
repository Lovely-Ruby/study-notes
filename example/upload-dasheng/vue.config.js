module.exports = {
  // 配置代理
  devServer: {
    port: 8080,
    open: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      "/dev_api": {
        target: "http://localhost:3000",
        // ==》 此处写明自己应该访问的代码
        changeOrigin: true,
        pathRewrite: {
          "^/dev_api": "",
        },
      },
    },
  },

  configureWebpack: {
    devServer: {
      before(app) {
        // app就是个express
        app.get("/xx", (req, res) => {
          res.send({ code: 0 });
        });
      },
    },
  },
};
