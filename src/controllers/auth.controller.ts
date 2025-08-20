import { Request, Response, NextFunction } from 'express';

import { prisma } from '../lib/prisma';
import { LoginInput, RegisterInput } from '../schemas/auth.schema';
import { generateToken } from '../services/jwt-token-service';
import { comparePassword, encryptPassword } from '../services/password-service';
import { errorResponse } from '../utils/response-handler';

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
      errorResponse(res, res.__('user_already_exists'));
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
      res.status(201).json('Email or password not correct');
      return;
    }

    const isPasswordCorrect = comparePassword({
      plainPassword: req.body.password,
      hashedPassword: user.password,
    });

    if (!isPasswordCorrect) {
      res.status(201).json('Email or password not correct');
      return;
    }

    const token = generateToken(user);

    res.status(201).json({ token, user });
  } catch (e) {
    next(e);
  }
}
