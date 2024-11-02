'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import studentRoutesEnum, {
  type StudentRoute,
} from '@/lib/enums/routes/studentRoutes';
import { EMPTY_STRING, WRONG_NUMBER } from '@/utils/constants';
import { usePathname } from 'next/navigation';
import useAppRouter from '@/hooks/useAppRouter';
import useModuleInputController from '@/hooks/useModuleInputController';

const studentRoutes = studentRoutesEnum.options;

const ModuleNav = () => {
  const pathname = usePathname() as StudentRoute;
  const routeDivider = '/';
  const router = useAppRouter();
  const moduleRoutes = studentRoutes.filter(
    (route) => route.includes('modules') && route.split(routeDivider).length > 3
  );
  const {
    isCertificateModuleCompleted,
    isGradesModuleCompleted,
    isInternshipModuleCompleted,
  } = useModuleInputController();

  const lastIndexOfRouteDivider =
    pathname?.lastIndexOf(routeDivider) ?? WRONG_NUMBER;
  const finalPathname =
    pathname?.substring(lastIndexOfRouteDivider + 1, pathname.length) ??
    EMPTY_STRING;

  useEffect(() => {
    function redirectToModuleHome() {
      const prompt =
        "Already done with this module, redirecting you to the module's home.";

      switch (true) {
        case pathname === '/student/modules/certificate' &&
          isCertificateModuleCompleted:
          router.push('/student/modules');
          alert(prompt);
          break;
        case pathname === '/student/modules/grade' && isGradesModuleCompleted:
          router.push('/student/modules');
          alert(prompt);
          break;
        case pathname === '/student/modules/internship' &&
          isInternshipModuleCompleted:
          router.push('/student/modules');
          alert(prompt);
          break;
      }
    }
    return redirectToModuleHome();
  }, [
    router,
    pathname,
    isCertificateModuleCompleted,
    isGradesModuleCompleted,
    isInternshipModuleCompleted,
  ]);

  return (
    <div className="bg-violet-200 p-2">
      <h3 className="py-8 text-center text-lg">Modules:</h3>
      <section className="flex justify-between">
        {moduleRoutes.map((route) => {
          const name = route.split('/')[3];
          let isButtonDisabled = true;

          const isActiveRoute = name.includes(finalPathname);

          switch (route) {
            case '/student/modules/certificate':
              isButtonDisabled = isCertificateModuleCompleted;
              break;
            case '/student/modules/grade':
              isButtonDisabled = isGradesModuleCompleted;
              break;
            case '/student/modules/internship':
              isButtonDisabled = isInternshipModuleCompleted;
              break;
          }

          const isRouteDisabled = isActiveRoute || isButtonDisabled;
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
                disabled={isRouteDisabled}
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
