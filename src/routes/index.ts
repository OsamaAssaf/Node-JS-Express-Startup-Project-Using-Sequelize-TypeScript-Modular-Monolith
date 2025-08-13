import { Router } from "express";
import users from "./users.routes";

const router = Router();

router.get("/health", (_req, res) => res.json({ ok: true }));
router.use("/users", users);

export default router;
