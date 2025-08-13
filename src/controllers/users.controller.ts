import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { CreateUserInput } from "../schemas/user.schema";

export async function list(_req: Request, res: Response, next: NextFunction) {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (e) {
    next(e);
  }
}

export async function create(
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await prisma.user.create({ data: req.body });
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
}
