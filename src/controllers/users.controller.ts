import { Request, Response, NextFunction } from 'express';

import { CreateUserInput, ListUsersQuery } from '../schemas/user.schema';
import { successResponse } from '../utils/response-handler';

export async function list(
  req: Request<object, object, ListUsersQuery>,
  res: Response,
  next: NextFunction,
) {
  try {
    // const role = req.query.role;
    // const where: { role?: Role } = {};
    // if (role) {
    //   where.role = role as Role;
    // }

    // const users: User[] = await prisma.user.findMany({ where });
    // const formattedUsers = users.map(userResponse);
    successResponse({ res, data: null });
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
    // const hashedPassword = await encryptPassword(req.body.password);
    // const user = await prisma.user.create({
    //   data: { email: req.body.email, name: req.body.name, password: hashedPassword },
    // });
    successResponse({ res });
  } catch (e) {
    next(e);
  }
}
