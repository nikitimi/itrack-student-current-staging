import { z } from 'zod';

export type AuthenticationStatus = z.infer<typeof authenticationStatusEnum>;

const authenticationStatusEnum = z.enum([
  'initializing',
  'no user',
  'verifying account',
  'verifying new password',
  'authenticated',
]);

export default authenticationStatusEnum;
