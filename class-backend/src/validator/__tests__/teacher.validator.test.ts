import { describe, expect, it } from 'vitest';

import { createTeacherSchema } from '../teacher.validator';

describe('createTeacherSchema', () => {
  it('should pass for valid input', () => {
    const data = {
      name: 'John Doe',
      subject: 'Math',
      email: 'john@example.com',
      contactNumber: '12345678',
    };
    const result = createTeacherSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('should fail if name is empty', () => {
    const data = {
      name: '',
      subject: 'Math',
      email: 'john@example.com',
      contactNumber: '12345678',
    };
    const result = createTeacherSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Name cannot be empty');
  });

  it('should fail if email is invalid', () => {
    const data = {
      name: 'John Doe',
      subject: 'Math',
      email: 'invalid-email',
      contactNumber: '12345678',
    };
    const result = createTeacherSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Invalid email address');
  });

  it('should fail if contactNumber is too short', () => {
    const data = {
      name: 'John Doe',
      subject: 'Math',
      email: 'john@example.com',
      contactNumber: '123',
    };
    const result = createTeacherSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Contact number too short');
  });
});
