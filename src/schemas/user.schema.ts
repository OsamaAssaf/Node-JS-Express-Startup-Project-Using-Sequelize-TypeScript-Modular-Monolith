import { z } from 'zod';

export const listUsersSchema = z.object({
  query: z.object({
    // page: z.string().regex(/^\d+$/).transform(Number).optional(),
    // limit: z.string().regex(/^\d+$/).transform(Number).optional(),
    // search: z.string().optional(),
    role: z.enum(['ADMIN', 'USER']).optional(),
    // sortBy: z.enum(['name', 'email', 'createdAt']).optional(),
    // sortOrder: z.enum(['asc', 'desc']).optional(),
  }),
});

export const createUserSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(6),
    name: z.string().min(1).optional().nullable(),
    role: z.enum(['ADMIN', 'USER']).optional(),
  }),
});

export type ListUsersQuery = z.infer<typeof listUsersSchema>['query'];
export type CreateUserInput = z.infer<typeof createUserSchema>['body'];
