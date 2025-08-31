import { z } from 'zod';

export const createClassSchema = z.object({
  name: z.string(),
  level: z.string(),
  teacherEmail: z.email(),
});

export type CreateClassDTO = z.infer<typeof createClassSchema>;
