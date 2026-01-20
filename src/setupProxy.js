const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:6543',
      changeOrigin: true,
      secure: false,
      onError: (err, req, res) => {
        if (!res.headersSent) {
          res.writeHead(503, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Backend no disponible' }));
        }
      },
      logLevel: 'silent',
    })
  );
};
