import { NextFunction, Request, Response } from 'express';
import * as z from 'zod';

export const validateSchemaMiddleware = (req: Request, res: Response, next: NextFunction, schema: z.ZodObject) => {
  try {
    const result = schema.parse(req.body);
    req.body = result;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ messageError: 'Formato dos dados enviados inválidos.' });
      next(error);
    }
  }
};
