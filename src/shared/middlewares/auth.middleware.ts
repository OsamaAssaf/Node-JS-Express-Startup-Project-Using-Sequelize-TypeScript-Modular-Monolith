import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../../modules/users/auth/jwt-token.service';
import { errorResponse } from '../utils/response-handler';
import HttpStatusCode from '../types/http-status-code';
import User from '../../modules/users/user/user.model';

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return errorResponse({
      res,
      message: res.__('unauthorized'),
      statusCode: HttpStatusCode.UNAUTHORIZED,
    });

  const token = authHeader.split(' ')[1];
  if (!token)
    return errorResponse({
      res,
      message: res.__('unauthorized'),
      statusCode: HttpStatusCode.UNAUTHORIZED,
    });

  try {
    const decoded = verifyToken(token) as JwtPayload;

    const userId = decoded.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return errorResponse({
        res,
        message: res.__('unauthorized'),
        statusCode: HttpStatusCode.UNAUTHORIZED,
      });
    }
    req.user = user;
    next();
  } catch {
    return errorResponse({
      res,
      message: res.__('invalid_token'),
      statusCode: HttpStatusCode.UNAUTHORIZED,
    });
  }
}

export function authorize(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return errorResponse({
        res,
        message: res.__('unauthorized'),
        statusCode: HttpStatusCode.UNAUTHORIZED,
      });
    }

    if (!roles.includes(req.user.role)) {
      return errorResponse({
        res,
        message: res.__('you_do_not_have_permission'),
        statusCode: HttpStatusCode.FORBIDDEN,
      });
    }

    next();
  };
}

export const requireAdmin = authorize('ADMIN');
export const requireUser = authorize('USER');
export const requireAuth = authenticate;
