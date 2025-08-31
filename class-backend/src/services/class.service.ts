import { Class, Teacher } from '@/database/models';
import { CreateClassDTO } from '@/validator/class.validator';

import { TeacherService } from './teacher.service';

export class ClassService {
  static async getAllClasses() {
    const classesPromise = Class.findAll({
      include: [
        {
          model: Teacher,
          attributes: ['name'],
        },
      ],
    });

    return (await classesPromise) as (Class & { Teacher: Teacher })[];
  }

  static async createClass(data: CreateClassDTO) {
    const teacher = await TeacherService.findTeacherByEmail(data.teacherEmail);

    const newClass = await Class.create({
      name: data.name,
      level: data.level,
      teacherId: teacher.id,
    });

    return newClass;
  }
}
