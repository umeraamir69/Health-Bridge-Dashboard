import { z } from 'zod';

export const appointmentSchema = z.object({
  patientId: z.string(),
  doctorId: z.string(),
  appointmentDate: z.string(), // ISO string
  reason: z.string().optional(),
  status: z.enum(['scheduled', 'completed', 'cancelled']).default('scheduled'),
  notes: z.string().optional(),
});
