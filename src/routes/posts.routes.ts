import { Router } from "express";
import { validate } from "../middlewares/validate";
import { createPostSchema } from "../schemas/post.schema";
import { list, create } from "../controllers/posts.controller";
const router = Router();

router.get("/", list);
router.post("/", validate(createPostSchema), create);

export default router;
