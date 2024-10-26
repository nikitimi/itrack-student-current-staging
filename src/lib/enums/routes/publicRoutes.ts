import { z } from 'zod';

export type PublicRoute = z.infer<typeof publicRoutesEnum>;

/** These are the routes for anonymous users. */
const publicRoutesEnum = z.enum(['/signup', '/signin', '/verify-email']);

export default publicRoutesEnum;
