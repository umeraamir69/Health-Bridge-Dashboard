import { z } from 'zod';

export const healthRecordSchema = z.object({
  userId: z.string(),
  recordType: z.enum(['prescription', 'lab_report', 'diagnosis']),
  description: z.string().optional(),
  fileUrl: z.string().url(),
  dateUploaded: z.string(), // ISO format
  tags: z.array(z.string()).optional()
});
