import { describe, expect, it } from 'vitest';

import { createClassSchema } from '../class.validator';

describe('createClassSchema', () => {
  it('should pass for valid input', () => {
    const data = {
      name: 'Class 1A',
      level: 'Primary 1',
      teacherEmail: 'teacher@example.com',
    };

    const result = createClassSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('should fail if name is empty', () => {
    const data = {
      name: '',
      level: 'Primary 1',
      teacherEmail: 'teacher@example.com',
    };

    const result = createClassSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Name cannot be empty');
  });

  it('should fail if name has invalid characters', () => {
    const data = {
      name: 'Class@1',
      level: 'Primary 1',
      teacherEmail: 'teacher@example.com',
    };

    const result = createClassSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      'Name can only contain letters, numbers, spaces, apostrophes, and hyphens',
    );
  });

  it('should fail if email is invalid', () => {
    const data = {
      name: 'Class 1A',
      level: 'Primary 1',
      teacherEmail: 'invalid-email',
    };

    const result = createClassSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Invalid email address');
  });
});
