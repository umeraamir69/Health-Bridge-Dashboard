// lib/middleware/validateInput.js
import { ZodError } from 'zod';

export function validateInput(schema) {
  return async function (req, res, next) {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: error.errors,
        });
      }
      next(error);
    }
  };
}
