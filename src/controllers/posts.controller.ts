import { Request, Response, NextFunction } from 'express';

import { prisma } from '../lib/prisma';
import { CreatePostInput } from '../schemas/post.schema';

export async function list(_req: Request, res: Response, next: NextFunction) {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (e) {
    next(e);
  }
}

export async function create(
  req: Request<object, object, CreatePostInput>,
  res: Response,
  next: NextFunction,
) {
  try {
    const post = await prisma.post.create({ data: req.body });
    res.status(201).json(post);
  } catch (e) {
    next(e);
  }
}
