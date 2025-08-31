import { Router } from 'express';

import { ClassController } from '@/controllers/class.controller';

const router = Router();

router.get('/', ClassController.getClasses);
router.post('/', ClassController.createClass);

export default router;
