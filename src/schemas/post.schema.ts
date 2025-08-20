import { z } from 'zod';

export const createPostSchema = z.object({
  body: z.object({
    title: z.string(),
  }),
});

export type CreatePostInput = z.infer<typeof createPostSchema>['body'];
