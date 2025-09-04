import { Request, Response, NextFunction } from 'express';
import { errorResponse, successResponse } from '../../../shared/utils/response-handler';
import { encryptPassword, comparePassword } from '../password.service';
import User from '../user/user.model';
import { RegisterInput, LoginInput } from './auth.schema';
import { generateToken } from './jwt-token.service';

export async function register(
  req: Request<object, object, RegisterInput>,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      attributes: { include: ['id'] },
    });

    if (user) {
      errorResponse({ res, message: res.__('user_already_exists') });
      return;
    }
    const hashedPassword = await encryptPassword(req.body.password);
    const newUser = new User();

    newUser.email = req.body.email;
    newUser.name = req.body.name;
    newUser.password = hashedPassword;
    const createdUser = await newUser.save();

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
    const user = await User.findOne({ where: { email: req.body.email } });

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
    successResponse({ res, data: { token, user } });
  } catch (e) {
    next(e);
  }
}
