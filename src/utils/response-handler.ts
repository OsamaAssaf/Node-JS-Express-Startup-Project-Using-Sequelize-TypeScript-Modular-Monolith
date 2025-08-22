import type { Response } from 'express';
import HttpStatusCode from '../types/http-status-code';

type ApiResponseParams<T = unknown> = {
  res: Response;
  message?: string;
  statusCode?: HttpStatusCode;
  data?: T | null;
};

export const successResponse = <T>({
  res,
  message = 'Success',
  statusCode = HttpStatusCode.OK,
  data = null,
}: ApiResponseParams<T>) =>
  res.status(statusCode).json({
    status: 'success',
    message,
    data,
  });

export const errorResponse = <T>({
  res,
  message = 'An error occurred',
  statusCode = HttpStatusCode.BAD_REQUEST,
  data = null,
}: ApiResponseParams<T>) =>
  res.status(statusCode).json({
    status: 'failed',
    message,
    data,
  });
