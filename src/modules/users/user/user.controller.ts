import { Request, Response, NextFunction } from 'express';
import { encryptPassword } from '../password.service';
import { successResponse } from '../../../shared/utils/response-handler';
import User, { Role } from './user.model';
import { ListUsersQuery, CreateUserInput } from './user.schema';

export async function list(
  req: Request<object, object, ListUsersQuery>,
  res: Response,
  next: NextFunction,
) {
  try {
    const role = req.query.role;
    const where: { role?: Role } = {};
    if (role && typeof role === 'string' && Object.values(Role).includes(role as Role)) {
      where.role = role as Role;
    }

    const users = await User.findOne({ where });
    successResponse({ res, data: users });
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
    const user = new User();
    user.email = req.body.email;
    user.name = req.body.name!;
    user.password = hashedPassword;

    const createdUser = await user.save();

    successResponse({ res, data: createdUser });
  } catch (e) {
    next(e);
  }
}
