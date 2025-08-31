import { Class } from '@/database/models/class.model';

export class ClassService {
  static async getAllClasses() {
    return Class.findAll();
  }

  static async createClass() {
    return Class.create();
  }
}
