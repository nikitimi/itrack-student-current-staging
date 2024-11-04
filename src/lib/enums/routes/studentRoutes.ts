import { z } from 'zod';

import { ABOUT_ROUTE } from '@/utils/constants';

export type StudentRoute = z.infer<typeof studentRoutesEnum>;

/** Don't move the index 0, it is the default dashboard route. */
const studentRoutesEnum = z.enum([
  '/student' /** Dashboard */,
  '/student/forgot-password',
  '/student/modules',
  '/student/modules/certificate',
  '/student/modules/grade',
  '/student/modules/internship',
  '/student/signin',
  '/student/signup',
  '/student/verify-email',
  '/student/verify-new-password',
  ABOUT_ROUTE,
]);

export default studentRoutesEnum;
