import { Router } from 'express';

import auth from '../../modules/users/auth/auth.route';
import users from '../../modules/users/user/user.route';

const router = Router();

router.get('/health', (_req, res) => res.json({ ok: true }));

router.use('/users', users);
router.use('/auth', auth);

export default router;
