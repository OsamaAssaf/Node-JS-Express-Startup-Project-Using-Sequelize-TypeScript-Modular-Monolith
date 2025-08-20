import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';

import { errorResponse } from '../utils/response-handler';

export const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // assign parsed values back (sanitized)
      req.body = result.body ?? req.body;
      if (result.query) Object.assign(req.query, result.query);
      if (result.params) Object.assign(req.params, result.params);

      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        const message = err.issues[0]?.message;
        let localizedMessage = res.__(message ?? 'something_went_wrong');
        if (localizedMessage === message) {
          localizedMessage = res.__('something_went_wrong');
        }

        return errorResponse(res, localizedMessage ?? res.__('something_went_wrong'));
        // return res.status(400).json({ errors: err.flatten() });
      }
      return next(err);
    }
  };
