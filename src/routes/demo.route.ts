import { Router } from 'express';
import { demo, demoAdmin, demoAuth } from '../controllers/demo.controller';
import { requireAdmin, requireAuth } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', demo);

// Group authenticated routes under requireAuth middleware
router.use(requireAuth);
router.get('/auth', demoAuth);
router.get('/admin', requireAdmin, demoAdmin);

export default router;
