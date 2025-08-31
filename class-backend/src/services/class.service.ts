import { Class, Teacher } from '@/database/models';
import { CreateClassDTO } from '@/validator/class.validator';

export class ClassService {
  static async getAllClasses() {
    return Class.findAll();
  }

  static async createClass(data: CreateClassDTO) {
    const teacher = await Teacher.findOne({
      where: { email: data.teacherEmail },
    });

    if (!teacher) {
      throw new Error(`Teacher with email ${data.teacherEmail} not found!`);
    }

    const newClass = await Class.create({
      name: data.name,
      level: data.level,
      teacherId: teacher.id,
    });

    return { id: newClass.id };
  }
}
