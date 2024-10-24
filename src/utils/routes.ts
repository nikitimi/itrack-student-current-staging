export const aboutRoute = '/';

/** Don't move the index 0, it is the default dashboard route. */
export const adminRoutes = [
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
  aboutRoute,
] as const;
/** Don't move the index 0, it is the default dashboard route. */
export const studentRoutes = [
  '/student' /** Dashboard */,
  '/student/modules',
  '/student/modules/certificate',
  '/student/modules/grade',
  '/student/modules/internship',
  '/student/profile',
  '/student/signin',
  '/student/signup',
  '/student/verify-email',
  aboutRoute,
] as const;

/** These are the routes for anonymous users. */
export const publicRoutes = ['/signup', '/signin', '/verify-email'] as const;
export default {
  admin: adminRoutes,
  student: studentRoutes,
} as const;

export function generateProtectedRoutes(
  array: typeof studentRoutes | typeof adminRoutes
) {
  const arrayCopy = [...array];
  const splicedThisIndexes = array
    .map((studentRoute, index) => {
      let routeIndexHolder = -1;
      publicRoutes.forEach((publicRoute) => {
        if (studentRoute.match(publicRoute) !== null) {
          routeIndexHolder = index;
        }
      });
      return routeIndexHolder;
    })
    .filter((route) => !(route === -1))
    .sort((a, b) => b - a);
  splicedThisIndexes.forEach((index) => {
    arrayCopy.splice(index);
  });
  return arrayCopy;
}
