import { Router } from 'express';
import { requireAdmin, requireAuth } from '../../../shared/middlewares/auth.middleware';
import { create, list } from './user.controller';
import { createUserSchema } from './user.schema';
import { validate } from '../../../shared/middlewares/validate.middleware';

const router = Router();

router.use(requireAuth, requireAdmin);
router.get('/', list);
router.post('/', validate(createUserSchema), create);

export default router;
