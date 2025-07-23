// lib/middleware/cors.js
export function cors(options = {}) {
    const defaults = {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: ['Content-Type', 'Authorization'],
    };
  
    const config = { ...defaults, ...options };
  
    return function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', config.origin);
      res.setHeader('Access-Control-Allow-Methods', config.methods);
      res.setHeader('Access-Control-Allow-Headers', config.allowedHeaders.join(','));
  
      if (req.method === 'OPTIONS') {
        return res.status(200).end();
      }
  
      next();
    };
  }
  