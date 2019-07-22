module.exports = {
  devServer: {
    port: 9999,
    proxy: {
      "/api": {
        // target: 'http://test2.ihappygroup.net/api',
        target: "http://test.ihappygroup.net/api",
        // target: 'http://scm.ihappygroup.net/api',
        // target: 'http://localhost:34800/api',
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
