import { z } from 'zod';

export const reviewSchema = z.object({
  userId: z.string(),
  targetId: z.string(), // doctorId, labId, or pharmacyId
  targetType: z.enum(['doctor', 'lab', 'pharmacy']),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  createdAt: z.string() // ISO format
});
