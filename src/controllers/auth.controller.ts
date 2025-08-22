import { Request, Response, NextFunction } from 'express';

import { prisma } from '../lib/prisma';
import { LoginInput, RegisterInput } from '../schemas/auth.schema';
import { generateToken } from '../services/jwt-token-service';
import { comparePassword, encryptPassword } from '../services/password-service';
import { errorResponse, successResponse } from '../utils/response-handler';
import { userResponse } from '../responses/user-response';

export async function register(
  req: Request<object, object, RegisterInput>,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
      select: { id: true },
    });
    if (user) {
      errorResponse({ res, message: res.__('user_already_exists') });
      return;
    }
    const hashedPassword = await encryptPassword(req.body.password);
    const createdUser = await prisma.user.create({
      data: { email: req.body.email, name: req.body.name, password: hashedPassword },
    });
    successResponse({ res, data: createdUser });
  } catch (e) {
    next(e);
  }
}

export async function login(
  req: Request<object, object, LoginInput>,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (!user) {
      errorResponse({ res, message: res.__('email_or_password_not_correct') });
      return;
    }

    const isPasswordCorrect = await comparePassword({
      plainPassword: req.body.password,
      hashedPassword: user.password,
    });

    if (!isPasswordCorrect) {
      errorResponse({ res, message: res.__('email_or_password_not_correct') });
      return;
    }

    const token = generateToken(user);
    successResponse({ res, data: { token, user: userResponse(user) } });
  } catch (e) {
    next(e);
  }
}
