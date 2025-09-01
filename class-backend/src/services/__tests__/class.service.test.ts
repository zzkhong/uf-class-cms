import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Class, Teacher } from '@/database/models';
import { TeacherService } from '@/services/teacher.service';
import { CreateClassDTO } from '@/validator/class.validator';

import { ClassService } from '../class.service';

// Mock models and service
vi.mock('@/database/models', () => ({
  Class: {
    findAll: vi.fn(),
    create: vi.fn(),
  },
  Teacher: { mockModel: true },
}));

vi.mock('@/services/teacher.service', () => ({
  TeacherService: {
    findTeacherByEmail: vi.fn(),
  },
}));

describe('ClassService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllClasses', () => {
    it('should return classes including teacher name', async () => {
      const mockClasses = [
        {
          id: 1,
          name: 'Class 1A',
          level: 'Primary 1',
          Teacher: { name: 'Mary' },
        },
      ];
      (Class.findAll as any).mockResolvedValue(mockClasses);

      const result = await ClassService.getAllClasses();

      expect(Class.findAll).toHaveBeenCalledWith({
        include: [
          {
            model: Teacher,
            attributes: ['name'],
          },
        ],
      });

      expect(result).toEqual(mockClasses);
    });

    it('should return empty array when no classes exist', async () => {
      (Class.findAll as any).mockResolvedValue([]);

      const result = await ClassService.getAllClasses();

      expect(result).toEqual([]);
    });
  });

  describe('createClass', () => {
    it('should create a class with a valid teacher', async () => {
      const mockTeacher = { id: 1, name: 'Mary', email: 'mary@test.com' };
      const dto: CreateClassDTO = {
        name: 'Class 1A',
        level: 'Primary 1',
        teacherEmail: 'mary@test.com',
      };

      (TeacherService.findTeacherByEmail as any).mockResolvedValue(mockTeacher);
      const mockNewClass = {
        id: 10,
        name: dto.name,
        level: dto.level,
        teacherId: mockTeacher.id,
      };
      (Class.create as any).mockResolvedValue(mockNewClass);

      const result = await ClassService.createClass(dto);

      expect(TeacherService.findTeacherByEmail).toHaveBeenCalledWith(
        dto.teacherEmail,
      );
      expect(Class.create).toHaveBeenCalledWith({
        name: dto.name,
        level: dto.level,
        teacherId: mockTeacher.id,
      });

      expect(result).toEqual(mockNewClass);
    });

    it('should throw if teacher not found', async () => {
      const dto: CreateClassDTO = {
        name: 'Class 1A',
        level: 'Primary 1',
        teacherEmail: 'unknown@test.com',
      };

      (TeacherService.findTeacherByEmail as any).mockRejectedValue(
        new Error('Teacher not found'),
      );

      await expect(ClassService.createClass(dto)).rejects.toThrow(
        'Teacher not found',
      );

      expect(Class.create).not.toHaveBeenCalled();
    });

    it('should throw if class creation fails', async () => {
      const mockTeacher = { id: 1, name: 'Mary', email: 'mary@test.com' };
      const dto: CreateClassDTO = {
        name: 'Class 1A',
        level: 'Primary 1',
        teacherEmail: 'mary@test.com',
      };

      (TeacherService.findTeacherByEmail as any).mockResolvedValue(mockTeacher);
      (Class.create as any).mockRejectedValue(
        new Error('Unique constraint violation'),
      );

      await expect(ClassService.createClass(dto)).rejects.toThrow(
        'Unique constraint violation',
      );

      expect(TeacherService.findTeacherByEmail).toHaveBeenCalledWith(
        dto.teacherEmail,
      );
      expect(Class.create).toHaveBeenCalledWith({
        name: dto.name,
        level: dto.level,
        teacherId: mockTeacher.id,
      });
    });
  });
});
