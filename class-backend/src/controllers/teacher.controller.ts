import { NextFunction, Request, Response } from 'express';

import { TeacherService } from '@/services/teacher.service';

export class TeacherController {
  static async getTeachers(req: Request, res: Response, next: NextFunction) {
    try {
      const teachers = await TeacherService.getAllTeachers();
      res.json(teachers);
    } catch (err) {
      next(err);
    }
  }

  static async createTeacher(req: Request, res: Response, next: NextFunction) {
    try {
      const newTeacher = await TeacherService.createTeacher();
      res.status(201).json(newTeacher);
    } catch (err) {
      next(err);
    }
  }
}
