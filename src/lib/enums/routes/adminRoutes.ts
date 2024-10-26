import { z } from 'zod';

import { ABOUT_ROUTE } from '@/utils/constants';

export type AdminRoute = z.infer<typeof adminRoutesEnum>;

/** Don't move the index 0, it is the default dashboard route. */
const adminRoutesEnum = z.enum([
  '/admin' /** Dashboard */,
  '/admin/job',
  '/admin/job/create',
  '/admin/job/update',
  '/admin/job/delete',
  '/admin/signin',
  '/admin/student',
  '/admin/student/certificate',
  '/admin/student/grade',
  '/admin/student/internship',
  '/admin/student/result',
  ABOUT_ROUTE,
]);

export default adminRoutesEnum;
