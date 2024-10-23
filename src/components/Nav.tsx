'use client';

import { adminRoutes, publicRoutes, studentRoutes } from '@/utils/routes';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { EMPTY_STRING } from '@/utils/constants';

const Nav = () => {
  const routeDivider = '/';
  const pathname = usePathname();
  const isPathnameForStudents = pathname.includes('/student');
  const dynamicRoute = isPathnameForStudents ? studentRoutes : adminRoutes;
  const dashboard = dynamicRoute[0];

  function routeHelper(route: (typeof dynamicRoute)[number]) {
    const routeFragments = route.split(routeDivider);
    const filteredRouteFragments = routeFragments.filter(
      (r) => r !== EMPTY_STRING
    );
    const finalRouteName =
      filteredRouteFragments.length === 0
        ? 'about'
        : filteredRouteFragments[filteredRouteFragments.length - 1];
    return { filteredRouteFragments, finalRouteName };
  }

  return (
    <nav className="bg-blue-700 p-2">
      <ul className="flex flex-row justify-between">
        {dynamicRoute
          .filter((route) => {
            const { finalRouteName } = routeHelper(route);

            return !publicRoutes.toLocaleString().includes(finalRouteName);
          })
          .map((route) => {
            const { filteredRouteFragments, finalRouteName } =
              routeHelper(route);

            switch (filteredRouteFragments.length) {
              case 3:
                return null;
              default:
                return (
                  <li key={route}>
                    <Link href={route} passHref>
                      <button className="w-32 gap-2 rounded-lg border px-2 py-1 capitalize duration-200 ease-in-out hover:border-black hover:bg-black">
                        {dashboard === route ? 'Dashboard' : finalRouteName}
                      </button>
                    </Link>
                  </li>
                );
            }
          })}
      </ul>
    </nav>
  );
};

export default Nav;
