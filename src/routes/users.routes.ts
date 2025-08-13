import { Router } from "express";
import { list, create } from "../controllers/users.controller";
import { validate } from "../middlewares/validate";
import { createUserSchema } from "../schemas/user.schema";

const router = Router();

router.get("/", list);
router.post("/", validate(createUserSchema), create);

export default router;
