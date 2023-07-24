const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/graphql', // The path where you want to use the proxy
    createProxyMiddleware({
      target: 'https://everest-backend.onrender.com',
      changeOrigin: true,
    })
  );
};
