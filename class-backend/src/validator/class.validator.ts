import { z } from 'zod';

import { RegexPatterns } from '@/utils/regex';

export const createClassSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name cannot be empty')
    .max(64, 'Name too long')
    .regex(
      RegexPatterns.ALPHANUMERIC_SYMBOL,
      'Name can only contain letters, numbers, spaces, apostrophes, and hyphens',
    ),
  level: z
    .string()
    .trim()
    .min(1, 'Level cannot be empty')
    .max(128, 'Level too long')
    .regex(
      RegexPatterns.ALPHANUMERIC_SYMBOL,
      'Level can only contain letters, numbers, spaces, apostrophes, and hyphens',
    ),
  teacherEmail: z.email('Invalid email address'),
});

export type CreateClassDTO = z.infer<typeof createClassSchema>;
