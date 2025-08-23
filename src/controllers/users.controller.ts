import { Request, Response, NextFunction } from 'express';

import { prisma } from '../lib/prisma';
import { CreateUserInput, ListUsersQuery } from '../schemas/user.schema';
import { encryptPassword } from '../services/password-service';
import { successResponse } from '../utils/response-handler';
import { userResponse } from '../responses/user-response';
import { Role, User } from '@prisma/client';

export async function list(
  req: Request<object, object, ListUsersQuery>,
  res: Response,
  next: NextFunction,
) {
  try {
    const role = req.query.role;
    const where: { role?: Role } = {};
    if (role) {
      where.role = role as Role;
    }

    const users: User[] = await prisma.user.findMany({ where });
    const formattedUsers = users.map(userResponse);
    successResponse({ res, data: formattedUsers });
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
