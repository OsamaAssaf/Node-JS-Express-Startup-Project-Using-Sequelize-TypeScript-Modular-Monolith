import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    email: z.email("validation.email_invalid"),
    password: z.string("validation.password_required").min(6, "validation.password_min"),
    name: z.string("validation.name_required").min(2, "validation.name_min"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email("validation.email"),
    password: z.string().min(6, "validation.password_min"),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];
