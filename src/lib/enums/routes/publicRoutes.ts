import { z } from 'zod';

export type PublicRoute = z.infer<typeof publicRoutesEnum>;

/** These are the routes for anonymous users. */
const publicRoutesEnum = z.enum([
  '/forgot-password',
  '/signup',
  '/signin',
  '/verify-email',
  '/verify-new-password',
]);

export default publicRoutesEnum;
