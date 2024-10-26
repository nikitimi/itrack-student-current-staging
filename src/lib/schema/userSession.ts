import { z } from 'zod';

export type UserSession = z.infer<typeof userSessionSchema>;

const userSessionSchema = z.object({
  abandon_at: z.number(),
  client_id: z.string(),
  created_at: z.number(),
  expire_at: z.number(),
  id: z.string(),
  last_active_at: z.number(),
  object: z.string().default('session'),
  status: z.string(),
  updated_at: z.number(),
  user_id: z.string(),
});

export default userSessionSchema;
