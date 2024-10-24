'use client';

import { useRouter } from 'next/navigation';
import type routes from '@/utils/routes';

type Route = (typeof routes.admin)[number] | (typeof routes.student)[number];

export default function useAppRouter() {
  const router = useRouter();

  return {
    push: (route: Route) => router.push(route),
    replace: (route: Route) => router.replace(route),
  };
}
