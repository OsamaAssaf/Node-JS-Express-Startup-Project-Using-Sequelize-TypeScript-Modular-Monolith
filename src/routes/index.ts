import { Router } from 'express';

import auth from './auth.route';
import users from './users.route';
import demo from './demo.route';

const router = Router();

router.get('/health', (_req, res) => res.json({ ok: true }));

router.use('/demo', demo);
router.use('/users', users);
router.use('/auth', auth);

export default router;
