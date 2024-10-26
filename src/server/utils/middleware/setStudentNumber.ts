'server only';

import type { ClerkMiddlewareAuthObject } from '@clerk/nextjs/server';

import type { GetStudentNumberResponse } from '@/server/lib/schema/apiResponse/getStudentNumber';

export default async function setStudentNumber(
  clerkAuthMiddleware: ClerkMiddlewareAuthObject,
  origin: string
) {
  const userId = clerkAuthMiddleware.userId as string;
  const params = new URLSearchParams({
    userId,
  });
  const url = new URL(`/api/getStudentNumber?${params}`, origin);
  const response = await fetch(url, {
    method: 'GET',
  });
  const { data } = (await response.json()) as GetStudentNumberResponse;
  const [role, specialization, studentNumber, studentType] = data;
  return { role, specialization, studentNumber, studentType };
}
