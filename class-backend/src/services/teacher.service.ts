import Teacher from '@/database/models/teacher.model';
import { CreateTeacherDTO } from '@/validator/teacher.validator';

export class TeacherService {
  static async getAllTeachers() {
    return Teacher.findAll();
  }

  static async createTeacher(data: CreateTeacherDTO) {
    return Teacher.create(data);
  }
}
