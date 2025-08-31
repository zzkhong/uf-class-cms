import { Router } from 'express';

import { TeacherController } from '@/controllers/teacher.controller';
import { validate } from '@/middlewares/validate';
import { createTeacherSchema } from '@/validator/teacher.validator';

const router = Router();

router.get('/', TeacherController.getTeachers);
router.post(
  '/',
  validate(createTeacherSchema),
  TeacherController.createTeacher,
);

export default router;
