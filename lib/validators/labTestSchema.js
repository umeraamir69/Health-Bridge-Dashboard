// lib/validators/labTestSchema.js
import { z } from 'zod';

export const labTestSchema = z.object({
  labId: z.string(), // Linked to lab user
  testName: z.string(),
  price: z.number().min(0),
  description: z.string().optional(),
  preparationInstructions: z.string().optional(),
  duration: z.string().optional(), // e.g., "24 hours"
  category: z.string().optional(), // e.g., "Blood", "Urine"
  location: z.object({
    country: z.string(),
    city: z.string(),
    address: z.string(),
  }).optional()
});
