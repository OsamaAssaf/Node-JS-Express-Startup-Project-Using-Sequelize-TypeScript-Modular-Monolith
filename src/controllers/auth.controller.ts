import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { LoginInput, RegisterInput } from "../schemas/auth.schema";
import { comparePassword, encryptPassword } from "../services/auth-service";
import { generateToken } from "../services/jwt-token-service";

export async function register(
  req: Request<{}, {}, RegisterInput>,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
      select: { id: true },
    });
    if (user) {
      res.status(201).json("User already exists");
      return;
    }
    const hashedPassword = await encryptPassword(req.body.password);
    const createdUser = await prisma.user.create({
      data: { email: req.body.email, name: req.body.name, password: hashedPassword },
    });
    res.status(201).json(createdUser);
  } catch (e) {
    next(e);
  }
}

export async function login(req: Request<{}, {}, LoginInput>, res: Response, next: NextFunction) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (!user) {
      res.status(201).json("Email or password not correct");
      return;
    }

    const isPasswordCorrect = comparePassword({
      plainPassword: req.body.password,
      hashedPassword: user.password,
    });

    if (!isPasswordCorrect) {
      res.status(201).json("Email or password not correct");
      return;
    }

    const token = generateToken(user);

    res.status(201).json({ token, user });
  } catch (e) {
    next(e);
  }
}
