'use client';

import type { AdminRoute } from '@/lib/enums/routes/adminRoutes';
import type { StudentRoute } from '@/lib/enums/routes/studentRoutes';

import { useRouter } from 'next/navigation';

type Route = AdminRoute | StudentRoute;

export default function useAppRouter() {
  const router = useRouter();
  return {
    back: () => router.back(),
    forward: () => router.forward(),
    prefetch: (route: Route) => router.prefetch(route),
    push: (route: Route) => router.push(route),
    refresh: () => router.refresh(),
    replace: (route: Route) => router.replace(route),
  };
}
