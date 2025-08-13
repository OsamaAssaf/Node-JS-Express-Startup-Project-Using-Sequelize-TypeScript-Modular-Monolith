import { ZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // assign parsed values back (sanitized)
      req.body = (result as any).body ?? req.body;
      req.query = (result as any).query ?? req.query;
      req.params = (result as any).params ?? req.params;

      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ errors: err.flatten() });
      }
      return next(err);
    }
  };
