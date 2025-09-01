import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Teacher } from '@/database/models';
import { AppError } from '@/utils/error-handler';
import { CreateTeacherDTO } from '@/validator/teacher.validator';

import { TeacherService } from '../teacher.service';

// Mock the Teacher model
vi.mock('@/database/models', () => ({
  Teacher: {
    findAll: vi.fn(),
    create: vi.fn(),
    findOne: vi.fn(),
  },
}));

describe('TeacherService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllTeachers', () => {
    it('should return all teachers from database', async () => {
      const mockTeachers = [
        {
          id: 1,
          name: 'Alice',
          subject: 'Math',
          email: 'alice@example.com',
          contactNumber: '12345678',
        },
        {
          id: 2,
          name: 'Bob',
          subject: 'English',
          email: 'bob@example.com',
          contactNumber: '87654321',
        },
      ];

      (Teacher.findAll as any).mockResolvedValue(mockTeachers);

      const result = await TeacherService.getAllTeachers();

      expect(Teacher.findAll).toHaveBeenCalledOnce();
      expect(result).toEqual(mockTeachers);
    });
  });

  describe('createTeacher', () => {
    it('should create a new teacher with valid data', async () => {
      const teacherData: CreateTeacherDTO = {
        name: 'John Doe',
        subject: 'Physics',
        email: 'john@example.com',
        contactNumber: '12345678',
      };

      const mockCreatedTeacher = { id: 1, ...teacherData };
      (Teacher.create as any).mockResolvedValue(mockCreatedTeacher);

      const result = await TeacherService.createTeacher(teacherData);

      expect(Teacher.create).toHaveBeenCalledWith(teacherData);
      expect(result).toEqual(mockCreatedTeacher);
    });
  });

  describe('findTeacherByEmail', () => {
    it('should return teacher when found', async () => {
      const mockTeacher = {
        id: 1,
        name: 'Alice',
        subject: 'Math',
        email: 'alice@example.com',
        contactNumber: '12345678',
      };

      (Teacher.findOne as any).mockResolvedValue(mockTeacher);

      const result =
        await TeacherService.findTeacherByEmail('alice@example.com');

      expect(Teacher.findOne).toHaveBeenCalledWith({
        where: { email: 'alice@example.com' },
      });
      expect(result).toEqual(mockTeacher);
    });

    it('should throw AppError when teacher not found', async () => {
      (Teacher.findOne as any).mockResolvedValue(null);

      await expect(
        TeacherService.findTeacherByEmail('nonexistent@example.com'),
      ).rejects.toThrow(AppError);

      await expect(
        TeacherService.findTeacherByEmail('nonexistent@example.com'),
      ).rejects.toThrow(
        'Teacher with email nonexistent@example.com not found!',
      );
    });
  });
});
