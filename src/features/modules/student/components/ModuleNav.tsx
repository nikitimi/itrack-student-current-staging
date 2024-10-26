import Link from 'next/link';
import { headers } from 'next/headers';
import React from 'react';

import studentRoutesEnum from '@/lib/enums/routes/studentRoutes';
import { EMPTY_STRING, WRONG_NUMBER } from '@/utils/constants';

const studentRoutes = studentRoutesEnum.options;

const ModuleNav = () => {
  const routeDivider = '/';
  const headerList = headers();
  const moduleRoutes = studentRoutes.filter(
    (route) => route.includes('modules') && route.split(routeDivider).length > 3
  );
  const fullPath = headerList.get('x-pathname');
  const lastIndexOfRouteDivider =
    fullPath?.lastIndexOf(routeDivider) ?? WRONG_NUMBER;
  const pathName =
    fullPath?.substring(lastIndexOfRouteDivider + 1, fullPath.length) ??
    EMPTY_STRING;

  return (
    <div className="bg-violet-200 p-2">
      <h3 className="py-8 text-center text-lg">Modules:</h3>
      <section className="flex justify-between">
        {moduleRoutes.map((route) => {
          const name = route.split('/')[3];

          const isActiveRoute = name.includes(pathName);

          const defaultClasses = [
            'rounded-lg',
            'border',
            'p-12',
            'capitalize',
            'duration-300',
            'ease-in-out',
          ];
          const colorClasses = ['border-black', 'bg-slate-400', 'text-black'];
          const hoverClasses = [
            'hover:bg-blue-400/80',
            'hover:border-blue-400',
          ];
          const activeClasses = [
            'border-green-700',
            'bg-green-700',
            'text-white',
          ];

          return (
            <Link key={route} href={route}>
              <button
                disabled={isActiveRoute}
                className={[
                  ...(isActiveRoute
                    ? activeClasses
                    : [...hoverClasses, ...colorClasses]),
                  ...defaultClasses,
                ]
                  .toLocaleString()
                  .replace(/,/g, ' ')}
              >
                {name}
              </button>
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default ModuleNav;
