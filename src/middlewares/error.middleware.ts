import { Request, Response } from 'express';
import { ZodError } from 'zod';

import { errorResponse } from '../utils/response-handler';

export function notFound(req: Request, res: Response) {
  return errorResponse(res, 'Not Found', 404);
}

export function errorHandler(err: unknown, req: Request, res: Response) {
  if (err instanceof ZodError) {
    return errorResponse(res, err.message, 400);
  }
  console.error(err);
  return errorResponse(res);
}
