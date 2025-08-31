import { NextFunction, Request, Response } from 'express';

import { TeacherService } from '@/services/teacher.service';

export class TeacherController {
  static async getTeachers(req: Request, res: Response, next: NextFunction) {
    try {
      const teachers = await TeacherService.getAllTeachers();
      res.json({
        data: teachers.map((teacher) => ({
          name: teacher.name,
          subject: teacher.subject,
          email: teacher.email,
          contactNumber: teacher.contactNumber,
        })),
      });
    } catch (err) {
      next(err);
    }
  }

  static async createTeacher(req: Request, res: Response, next: NextFunction) {
    try {
      await TeacherService.createTeacher(req.body);
      res.status(201).json();
    } catch (err) {
      next(err);
    }
  }
}
