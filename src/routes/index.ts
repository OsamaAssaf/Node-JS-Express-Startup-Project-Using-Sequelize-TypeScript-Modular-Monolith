import { Router } from 'express';

import { authenticate } from '../middlewares/auth.middleware';

import auth from './auth.route';
import users from './users.route';

const router = Router();

router.get('/health', (_req, res) => res.json({ ok: true }));

router.get('/me', authenticate, (req, res) => {
  res.json({ message: 'Hello, authenticated user!', user: req.user });
});

router.use('/users', users);
router.use('/auth', auth);

export default router;
