import { Request, Response } from 'express';
import { ZodError } from 'zod';

import { errorResponse } from '../utils/response-handler';

export function notFound(req: Request, res: Response) {
  return errorResponse({ res, message: res.__('not_found'), statusCode: 404 });
}

export function errorHandler(err: unknown, req: Request, res: Response) {
  if (err instanceof ZodError) {
    return errorResponse({ res, message: err.message, statusCode: 400 });
  }
  return errorResponse({ res });
}
