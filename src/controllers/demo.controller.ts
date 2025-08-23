import { NextFunction, Request, Response } from 'express';
import { successResponse } from '../utils/response-handler';

export function demo(req: Request, res: Response, next: NextFunction) {
  try {
    successResponse({ res, data: 'Hi from demo!' });
  } catch (e) {
    next(e);
  }
}
export function demoAuth(req: Request, res: Response, next: NextFunction) {
  try {
    successResponse({ res, data: 'Hi from demo auth!' });
  } catch (e) {
    next(e);
  }
}

export function demoAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    successResponse({ res, data: 'Hi from demo admin!' });
  } catch (e) {
    next(e);
  }
}
