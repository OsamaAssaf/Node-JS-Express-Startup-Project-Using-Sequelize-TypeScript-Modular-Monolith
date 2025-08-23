import { Router } from 'express';

import { list, create } from '../controllers/users.controller';
import { validate } from '../middlewares/validate.middleware';
import { createUserSchema } from '../schemas/user.schema';
import { requireAdmin, requireAuth } from '../middlewares/auth.middleware';

const router = Router();

router.use(requireAuth, requireAdmin);
router.get('/', list);
router.post('/', validate(createUserSchema), create);

export default router;
