import { Router } from 'express';

import { TeacherController } from '@/controllers/teacher.controller';

const router = Router();

router.get('/', TeacherController.getTeachers);
router.post('/', TeacherController.createTeacher);

export default router;
