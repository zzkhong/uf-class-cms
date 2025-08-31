import { Teacher } from '@/database/models/teacher.model';

export class TeacherService {
  static async getAllTeachers() {
    return Teacher.findAll();
  }

  static async createTeacher() {
    return Teacher.create();
  }
}
