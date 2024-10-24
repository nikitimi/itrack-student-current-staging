import { NextResponse } from 'next/server';
import {
  studentRoutes,
  adminRoutes,
  generateProtectedRoutes,
} from '@/utils/routes';
import { clerkMiddleware } from '@clerk/nextjs/server';

const protectedStudentRoutes = generateProtectedRoutes(studentRoutes);
const protectedAdminRoutes = generateProtectedRoutes(adminRoutes);

export default clerkMiddleware(async (auth, request) => {
  const session = await auth();
  const url = new URL(request.url);
  const origin = url.origin;
  const pathname = url.pathname as ReturnType<
    typeof generateProtectedRoutes
  >[number];
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);
  requestHeaders.set('x-origin', origin);
  requestHeaders.set('x-pathname', pathname);

  if (session.sessionId === null) {
    console.log();
    switch (true) {
      case protectedStudentRoutes.includes(pathname):
        console.log('student');
        return NextResponse.redirect(new URL('/student/signin', request.url));
      case protectedAdminRoutes.includes(pathname):
        console.log('admin');
        return NextResponse.redirect(new URL('/admin/signin', request.url));
    }
  }
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
