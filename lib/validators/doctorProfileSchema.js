// lib/validators/doctorProfileSchema.js
import { z } from 'zod';

export const doctorProfileSchema = z.object({
  userId: z.string(), // Must be linked to registered user
  specialization: z.string(),
  qualifications: z.string(),
  experience: z.number().min(0),
  hospitalAffiliation: z.string().optional(),
  availableSlots: z.array(z.string()).optional(), // ISO date strings
  licenseNumber: z.string(),
  fees: z.number().min(0),
  location: z.object({
    country: z.string(),
    city: z.string(),
    address: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number()
    }).optional()
  }),
});
