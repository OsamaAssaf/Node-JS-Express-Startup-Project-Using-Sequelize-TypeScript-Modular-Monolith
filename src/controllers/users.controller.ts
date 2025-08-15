import { Request, Response, NextFunction } from "express";

import { prisma } from "../lib/prisma";
import { CreateUserInput } from "../schemas/user.schema";
import { encryptPassword } from "../services/password-service";

export async function list(_req: Request, res: Response, next: NextFunction) {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (e) {
    next(e);
  }
}

export async function create(
  req: Request<object, object, CreateUserInput>,
  res: Response,
  next: NextFunction,
) {
  try {
    const hashedPassword = await encryptPassword(req.body.password);
    const user = await prisma.user.create({
      data: { email: req.body.email, name: req.body.name, password: hashedPassword },
    });
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
}
