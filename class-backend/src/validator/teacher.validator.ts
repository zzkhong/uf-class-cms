import { z } from 'zod';

export const createTeacherSchema = z.object({
  name: z.string(),
  subject: z.string(),
  email: z.email(),
  contactNumber: z.string(),
});

export type CreateTeacherDTO = z.infer<typeof createTeacherSchema>;
