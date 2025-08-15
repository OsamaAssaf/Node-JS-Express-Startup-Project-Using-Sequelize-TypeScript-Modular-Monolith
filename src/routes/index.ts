import { Router } from "express";
import users from "./users.route";
import auth from "./auth.route";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/health", (_req, res) => res.json({ ok: true }));

router.get("/me", authenticate, (req, res) => {
  res.json({ message: "Hello, authenticated user!", user: (req as any).user });
});

router.use("/users", users);
router.use("/auth", auth);

export default router;
