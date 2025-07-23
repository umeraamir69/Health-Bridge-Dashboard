// lib/validators/registerUserSchema.js
import { z } from 'zod';

export const registerUserSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().min(10).optional(),
  type: z.enum(['patient', 'doctor', 'pharmacy', 'lab']),
  gender: z.enum(['male', 'female', 'other']).optional(),
  dateOfBirth: z.string().optional(),
  country: z.string().optional(),
  language: z.string().optional(),
});
