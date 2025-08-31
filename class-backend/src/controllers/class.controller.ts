import { NextFunction, Request, Response } from 'express';

import { ClassService } from '@/services/class.service';

export class ClassController {
  static async getClasses(req: Request, res: Response, next: NextFunction) {
    try {
      const classes = await ClassService.getAllClasses();

      res.json({
        data: classes.map((curClass) => ({
          level: curClass.level,
          name: curClass.name,
          formTeacher: {
            name: curClass.Teacher.name,
          },
        })),
      });
    } catch (err) {
      next(err);
    }
  }

  static async createClass(req: Request, res: Response, next: NextFunction) {
    try {
      await ClassService.createClass(req.body);
      res.status(201).json();
    } catch (err) {
      next(err);
    }
  }
}
