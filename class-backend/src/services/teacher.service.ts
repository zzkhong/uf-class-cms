import { Teacher } from '@/database/models';
import { AppError } from '@/utils/error-handler';
import { CreateTeacherDTO } from '@/validator/teacher.validator';

export class TeacherService {
  static async getAllTeachers() {
    return Teacher.findAll();
  }

  static async createTeacher(data: CreateTeacherDTO) {
    const newTeacher = await Teacher.create(data);
    return newTeacher;
  }

  static async findTeacherByEmail(email: string) {
    const teacher = await Teacher.findOne({
      where: { email },
    });

    if (!teacher) {
      throw new AppError(`Teacher with email ${email} not found!`, 404);
    }

    return teacher;
  }
}
