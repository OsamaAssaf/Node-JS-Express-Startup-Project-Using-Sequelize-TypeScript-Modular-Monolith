import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import { prisma } from '../lib/prisma';
import { verifyToken } from '../services/jwt-token-service';
import { errorResponse } from '../utils/response-handler';
import HttpStatusCode from '../types/http-status-code';

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return errorResponse({ res, message: 'Unauthorized', statusCode: HttpStatusCode.UNAUTHORIZED });

  const token = authHeader.split(' ')[1];
  if (!token)
    return errorResponse({ res, message: 'Unauthorized', statusCode: HttpStatusCode.UNAUTHORIZED });

  try {
    const decoded = verifyToken(token) as JwtPayload;

    const userId = decoded.id;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return errorResponse({
        res,
        message: 'Unauthorized',
        statusCode: HttpStatusCode.UNAUTHORIZED,
      });
    }
    req.user = user;
    next();
  } catch {
    return errorResponse({
      res,
      message: 'Invalid token',
      statusCode: HttpStatusCode.UNAUTHORIZED,
    });
  }
}

export function authorize(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return errorResponse({
        res,
        message: 'Unauthorized',
        statusCode: HttpStatusCode.UNAUTHORIZED,
      });
    }

    if (!roles.includes(req.user.role)) {
      return errorResponse({
        res,
        message: 'Forbidden: Insufficient permissions',
        statusCode: HttpStatusCode.FORBIDDEN,
      });
    }

    next();
  };
}

// Combined middleware that handles both authentication and authorization
// export function authenticateAndAuthorize(...roles: string[]) {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     // First authenticate
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer '))
//       return errorResponse({
//         res,
//         message: 'Unauthorized',
//         statusCode: HttpStatusCode.UNAUTHORIZED,
//       });

//     const token = authHeader.split(' ')[1];
//     if (!token)
//       return errorResponse({
//         res,
//         message: 'Unauthorized',
//         statusCode: HttpStatusCode.UNAUTHORIZED,
//       });

//     try {
//       const decoded = verifyToken(token) as JwtPayload;
//       const userId = decoded.id;

//       const user = await prisma.user.findUnique({ where: { id: userId } });
//       if (!user) {
//         return errorResponse({
//           res,
//           message: 'Unauthorized',
//           statusCode: HttpStatusCode.UNAUTHORIZED,
//         });
//       }
//       req.user = user;

//       // Then authorize
//       if (!roles.includes(user.role)) {
//         return errorResponse({
//           res,
//           message: 'Forbidden: Insufficient permissions',
//           statusCode: HttpStatusCode.FORBIDDEN,
//         });
//       }

//       next();
//     } catch {
//       return errorResponse({
//         res,
//         message: 'Invalid token',
//         statusCode: HttpStatusCode.UNAUTHORIZED,
//       });
//     }
//   };
// }

// Convenience middleware for common role checks
export const requireAdmin = authorize('ADMIN');
export const requireUser = authorize('USER');
export const requireAuth = authenticate;

// Convenience combined middleware
// export const requireAdminAuth = authenticateAndAuthorize('ADMIN');
// export const requireUserAuth = authenticateAndAuthorize('USER');
