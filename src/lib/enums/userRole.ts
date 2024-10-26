import { z } from 'zod';

export type UserRole = z.infer<typeof userRoleEnum>;

const userRoleEnum = z.enum(['student', 'admin']);

export default userRoleEnum;
