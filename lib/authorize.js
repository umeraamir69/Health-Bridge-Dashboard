// lib/middleware/authorize.js
export function authorize(allowedRoles = []) {
    return function (req, res, next) {
      const user = req.user;
  
      if (!user || !allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Forbidden: Insufficient rights' });
      }
  
      next();
    };
  }
  