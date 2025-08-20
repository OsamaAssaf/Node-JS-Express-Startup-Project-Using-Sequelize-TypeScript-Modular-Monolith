import { Router } from 'express';

import { list, create } from '../controllers/posts.controller';
import { validate } from '../middlewares/validate.middleware';
import { createPostSchema } from '../schemas/post.schema';
const router = Router();

router.get('/', list);
router.post('/', validate(createPostSchema), create);

export default router;
