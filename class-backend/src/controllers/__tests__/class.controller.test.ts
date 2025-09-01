import express, { NextFunction, Request, Response } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ClassService } from '@/services/class.service';

import { ClassController } from '../class.controller';

// Mock ClassService
vi.mock('@/services/class.service', () => ({
  ClassService: {
    getAllClasses: vi.fn(),
    createClass: vi.fn(),
  },
}));

describe('ClassController', () => {
  let app: ReturnType<typeof express>;

  beforeEach(() => {
    vi.clearAllMocks();
    app = express();
    app.use(express.json());

    // Routes for testing
    app.get('/classes', ClassController.getClasses);
    app.post('/classes', ClassController.createClass);

    // Mock error handler
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      res.status(err.status || 500).json({ error: err.message });
    });
  });

  describe('GET /classes', () => {
    it('should return list of classes with teacher names', async () => {
      const mockClasses = [
        {
          id: 1,
          name: 'Class 1A',
          level: 'Primary 1',
          Teacher: { name: 'Mary' },
        },
      ];
      (ClassService.getAllClasses as any).mockResolvedValue(mockClasses);

      const res = await request(app).get('/classes');

      expect(ClassService.getAllClasses).toHaveBeenCalled();
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        data: [
          {
            name: 'Class 1A',
            level: 'Primary 1',
            formTeacher: { name: 'Mary' },
          },
        ],
      });
    });

    it('should call next with error if service fails', async () => {
      (ClassService.getAllClasses as any).mockRejectedValue(
        new Error('Internal Server Error'),
      );

      const res = await request(app).get('/classes');

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Internal Server Error' });
    });
  });

  describe('POST /classes', () => {
    it('should create a class and return 201', async () => {
      (ClassService.createClass as any).mockResolvedValue({ id: 1 });

      const res = await request(app).post('/classes').send({
        name: 'Class 1A',
        level: 'Primary 1',
        teacherEmail: 'mary@test.com',
      });

      expect(ClassService.createClass).toHaveBeenCalledWith({
        name: 'Class 1A',
        level: 'Primary 1',
        teacherEmail: 'mary@test.com',
      });
      expect(res.status).toBe(201);
      expect(res.body).toEqual('');
    });

    it('should call next with error if creation fails', async () => {
      (ClassService.createClass as any).mockRejectedValue(
        new Error('Teacher not found!'),
      );

      const res = await request(app).post('/classes').send({
        name: 'Class 1A',
        level: 'Primary 1',
        teacherEmail: 'unknown@test.com',
      });

      expect(res.status).toBe(500);
      expect(res.body).toEqual({
        error: 'Teacher not found!',
      });
    });
  });
});
