// lib/middleware/rateLimiter.js
const rateLimitMap = new Map();

export function rateLimiter({ windowMs = 60000, max = 60 }) {
  return function (req, res, next) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const now = Date.now();
    const record = rateLimitMap.get(ip) || { count: 0, time: now };

    if (now - record.time < windowMs) {
      if (record.count >= max) {
        return res.status(429).json({ message: 'Too many requests' });
      }
      record.count++;
    } else {
      record.count = 1;
      record.time = now;
    }

    rateLimitMap.set(ip, record);
    next();
  };
}
