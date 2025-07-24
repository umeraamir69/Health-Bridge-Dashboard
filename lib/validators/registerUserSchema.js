import * as z from "zod"; 

export const registerUserSchema = z.object({
  fullName: z.string().min(2, 'Full name is too short'),
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().min(10).optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  dateOfBirth: z.coerce.date().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  language: z.string().default("en").optional(),
  profilePicture: z.string().url().optional(),
  insuranceNumber: z.string().optional(),
  location: z.object({
    type: z.literal("Point").default("Point"),
    coordinates: z.tuple([z.number(), z.number()]).optional(), // [longitude, latitude]
  }).optional(),

  healthGoals: z.array(z.string()).optional(),
  chronicConditions: z.array(z.string()).optional(),
  allergies: z.array(z.string()).optional(),
  medications: z.array(z.string()).optional(),

  emergencyContacts: z.array(
    z.object({
      name: z.string(),
      relation: z.string(),
      phone: z.string(),
      email: z.string().email().optional(),
      address: z.string().optional(),
    })
  ).optional(),

  role: z.enum(['patient', 'doctor', 'labAdmin', 'pharmacyAdmin', 'admin']).optional(),
});
