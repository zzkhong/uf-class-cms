import express, { NextFunction, Request, Response } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TeacherService } from '@/services/teacher.service';

import { TeacherController } from '../teacher.controller';

// Mock TeacherService
vi.mock('@/services/teacher.service', () => ({
  TeacherService: {
    getAllTeachers: vi.fn(),
    createTeacher: vi.fn(),
  },
}));

describe('TeacherController', () => {
  let app: ReturnType<typeof express>;

  beforeEach(() => {
    vi.clearAllMocks();
    app = express();
    app.use(express.json());

    // Routes for testing
    app.get('/teachers', TeacherController.getTeachers);
    app.post('/teachers', TeacherController.createTeacher);

    // Mock error handler
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      res.status(err.status || 500).json({ error: err.message });
    });
  });

  describe('GET /teachers', () => {
    it('should return list of teachers', async () => {
      const mockTeachers = [
        {
          name: 'Mary',
          subject: 'Math',
          email: 'mary@test.com',
          contactNumber: '1234',
        },
      ];
      (TeacherService.getAllTeachers as any).mockResolvedValue(mockTeachers);

      const res = await request(app).get('/teachers');

      expect(TeacherService.getAllTeachers).toHaveBeenCalled();
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        data: [
          {
            name: 'Mary',
            subject: 'Math',
            email: 'mary@test.com',
            contactNumber: '1234',
          },
        ],
      });
    });

    it('should call next with error if service fails', async () => {
      (TeacherService.getAllTeachers as any).mockRejectedValue(
        new Error('Internal Server Error'),
      );

      const res = await request(app).get('/teachers');

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Internal Server Error' });
    });
  });

  describe('POST /teachers', () => {
    it('should create a teacher and return 201', async () => {
      (TeacherService.createTeacher as any).mockResolvedValue({ id: 1 });

      const res = await request(app).post('/teachers').send({
        name: 'Mary',
        subject: 'Math',
        email: 'mary@test.com',
        contactNumber: '1234',
      });

      expect(TeacherService.createTeacher).toHaveBeenCalledWith({
        name: 'Mary',
        subject: 'Math',
        email: 'mary@test.com',
        contactNumber: '1234',
      });
      expect(res.status).toBe(201);
    });

    it('should call next with error if creation fails', async () => {
      (TeacherService.createTeacher as any).mockRejectedValue(
        new Error('Email must be unique'),
      );

      const res = await request(app).post('/teachers').send({
        name: 'Mary',
        subject: 'Math',
        email: 'mary@test.com',
        contactNumber: '1234',
      });

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Email must be unique' });
    });
  });
});
