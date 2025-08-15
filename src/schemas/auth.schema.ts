import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(6),
    name: z.string().min(2),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(6),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];
