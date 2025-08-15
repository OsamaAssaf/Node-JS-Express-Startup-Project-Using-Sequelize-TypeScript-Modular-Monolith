import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { errorResponse } from "../utils/response-handler";

export function notFound(req: Request, res: Response) {
  return errorResponse(res, "Not Found", 404);
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return errorResponse(res, err.message, 400);
    // return res.status(400).json({ errors: err.flatten() });
  }
  console.error(err);
  return errorResponse(res);
  // res.status(500).json({ error: "Internal Server Error" });
}
