import { z } from 'zod';

import { RegexPatterns } from '@/utils/regex';

export const createTeacherSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name cannot be empty')
    .max(64, 'Name too long')
    .regex(
      RegexPatterns.ALPHANUMERIC_SYMBOL,
      'Name can only contain letters, numbers, spaces, apostrophes, and hyphens',
    ),
  subject: z
    .string()
    .trim()
    .min(1, 'Subject cannot be empty')
    .max(128, 'Subject too long')
    .regex(
      RegexPatterns.ALPHANUMERIC_SYMBOL,
      'Name can only contain letters, numbers, spaces, apostrophes, and hyphens',
    ),
  email: z.email('Invalid email address'),
  contactNumber: z
    .string()
    .trim()
    .regex(
      RegexPatterns.CONTACT_NUMBER,
      'Contact number must contain only 8 digits',
    ),
});

export type CreateTeacherDTO = z.infer<typeof createTeacherSchema>;
