import { Teacher } from '@/database/models';
import { CreateTeacherDTO } from '@/validator/teacher.validator';

export class TeacherService {
  static async getAllTeachers() {
    return Teacher.findAll();
  }

  static async createTeacher(data: CreateTeacherDTO) {
    const newTeacher = await Teacher.create(data);
    return { id: newTeacher.id };
  }
}
