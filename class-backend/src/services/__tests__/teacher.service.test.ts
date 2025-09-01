import express, { NextFunction, Request, Response } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TeacherController } from '@/controllers/teacher.controller';
import { TeacherService } from '@/services/teacher.service';

// Mock the service
vi.mock('@/services/teacher.service');

const mockedTeachers = [
  {
    name: 'Alice',
    subject: 'Math',
    email: 'alice@example.com',
    contactNumber: '12345678',
  },
  {
    name: 'Bob',
    subject: 'English',
    email: 'bob@example.com',
    contactNumber: '87654321',
  },
];

describe('TeacherController', () => {
  let app: express.Express;

  beforeEach(() => {
    vi.clearAllMocks();

    app = express();
    app.use(express.json());

    app.get('/teachers', TeacherController.getTeachers);
    app.post('/teachers', TeacherController.createTeacher);

    // Simple error handler for testing
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      res
        .status(err.status || 500)
        .json({ error: err.message || 'Internal Server Error' });
    });
  });

  it('GET /teachers returns list of teachers', async () => {
    (TeacherService.getAllTeachers as any).mockResolvedValue(mockedTeachers);

    const res = await request(app).get('/teachers');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      data: mockedTeachers.map((t) => ({
        name: t.name,
        subject: t.subject,
        email: t.email,
        contactNumber: t.contactNumber,
      })),
    });
  });

  it('GET /teachers returns error when service throws', async () => {
    (TeacherService.getAllTeachers as any).mockRejectedValue(
      new Error('Database unavailable'),
    );

    const res = await request(app).get('/teachers');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Database unavailable' });
  });

  it('POST /teachers creates a teacher', async () => {
    const newTeacher = { id: 1, ...mockedTeachers[0] };
    (TeacherService.createTeacher as any).mockResolvedValue(newTeacher);

    const res = await request(app).post('/teachers').send({
      name: 'Alice',
      subject: 'Math',
      email: 'alice@example.com',
      contactNumber: '12345678',
    });

    expect(res.status).toBe(201);
  });

  it('POST /teachers returns error when service throws', async () => {
    (TeacherService.createTeacher as any).mockRejectedValue(
      new Error('Something went wrong'),
    );

    const res = await request(app).post('/teachers').send({
      name: 'Alice',
      subject: 'Math',
      email: 'alice@example.com',
      contactNumber: '12345678',
    });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Something went wrong' });
  });
});
