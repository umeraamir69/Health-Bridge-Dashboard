// lib/validators/medicineEntrySchema.js
import { z } from 'zod';

export const medicineEntrySchema = z.object({
  pharmacyId: z.string(), // Linked to pharmacy user
  name: z.string(),
  manufacturer: z.string(),
  price: z.number().min(0),
  quantityAvailable: z.number().min(0),
  expiryDate: z.string(), // You can convert to ISO later
  prescriptionRequired: z.boolean(),
  description: z.string().optional(),
  category: z.string().optional(), // e.g., Antibiotics, Painkillers
  location: z.object({
    country: z.string(),
    city: z.string(),
    address: z.string(),
  }).optional()
});
