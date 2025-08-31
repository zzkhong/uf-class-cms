import { Router } from 'express';

import { ClassController } from '@/controllers/class.controller';
import { validate } from '@/middlewares/validate.middleware';
import { createClassSchema } from '@/validator/class.validator';

const router = Router();

router.get('/', ClassController.getClasses);
router.post('/', validate(createClassSchema), ClassController.createClass);

export default router;
