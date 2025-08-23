import { Request, Response } from 'express';
import { ZodError } from 'zod';

import { errorResponse } from '../utils/response-handler';
import HttpStatusCode from '../types/http-status-code';

export function notFound(req: Request, res: Response) {
  return errorResponse({ res, message: res.__('not_found'), statusCode: HttpStatusCode.NOT_FOUND });
}

export function errorHandler(err: unknown, _req: Request, res: Response) {
  if (err instanceof ZodError) {
    return errorResponse({ res, message: err.message });
  }
  return errorResponse({ res });
}
