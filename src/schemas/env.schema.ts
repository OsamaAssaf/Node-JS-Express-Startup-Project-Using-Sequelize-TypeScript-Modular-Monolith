import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  DP_TYPE: z.enum(['postgres']),
  DP_HOST: z.string(),
  DP_PORT: z.coerce.number().int().positive().default(5432),
  DP_USERNAME: z.string(),
  DP_PASSWORD: z.string(),
  DP_NAME: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
});

export type Env = z.infer<typeof envSchema>;
