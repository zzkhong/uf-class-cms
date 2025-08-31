import { NextFunction, Request, Response } from 'express';

import { ClassService } from '@/services/class.service';

export class ClassController {
  static async getClasses(req: Request, res: Response, next: NextFunction) {
    try {
      const classes = await ClassService.getAllClasses();
      res.json(classes);
    } catch (err) {
      next(err);
    }
  }

  static async createClass(req: Request, res: Response, next: NextFunction) {
    try {
      const newClass = await ClassService.createClass(req.body);
      res.status(201).json(newClass);
    } catch (err) {
      next(err);
    }
  }
}
