// lib/middleware/detectLocale.js
export function detectLocale(req, res, next) {
    const acceptLanguage = req.headers['accept-language'];
    req.locale = acceptLanguage?.split(',')[0] || 'en-US';
    next();
  }
  