import type { AdminRoute } from '@/lib/enums/routes/adminRoutes';
import type { StudentRoute } from '@/lib/enums/routes/studentRoutes';

import publicRoutesEnum from '@/lib/enums/routes/publicRoutes';

type Routes = StudentRoute[] | AdminRoute[];

export default function generateProtectedRoutes(routes: Routes) {
  const routesCopy = [...routes];
  const splicedThisIndexes = routes
    .map((studentRoute, index) => {
      let routeIndexHolder = -1;
      publicRoutesEnum.options.forEach((publicRoute) => {
        if (studentRoute.match(publicRoute) !== null) {
          routeIndexHolder = index;
        }
      });
      return routeIndexHolder;
    })
    .filter((route) => !(route === -1))
    .sort((a, b) => b - a);
  splicedThisIndexes.forEach((index) => {
    routesCopy.splice(index);
  });
  return routesCopy;
}
