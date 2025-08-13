import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function notFound(req: Request, res: Response) {
  res.status(404).json({ error: "Not Found" });
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({ errors: err.flatten() });
  }
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
}
