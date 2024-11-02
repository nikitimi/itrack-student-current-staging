import type { Metadata } from 'next';

import type { Children } from '@/utils/types/children';
import type { Specialization } from '@/lib/enums/specialization';
import type { StudentType } from '@/lib/enums/studentType';
import type { UserRole } from '@/lib/enums/userRole';

import { ClerkProvider } from '@clerk/nextjs';
import localFont from 'next/font/local';
import { headers } from 'next/headers';
import { Suspense } from 'react';

import Loading from '@/components/Loading';
import StoreProvider from '@/components/StoreProvider';
import { EMPTY_STRING, HEADER_KEY } from '@/utils/constants';

import '@/app/globals.css';
import getDatabaseInformations from '@/server/utils/getDatabaseInformations';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'iTrack | About',
  description: 'Tracking your future!',
};

export default async function RootLayout({ children }: Children) {
  const headerList = headers();

  // TODO: Move this out to a separate global client component handler to set correct user type.
  const userId = headerList.get(HEADER_KEY.uid) || null;
  const studentNumber =
    headerList.get(HEADER_KEY.studentNumber) || EMPTY_STRING;
  const role = (headerList.get(HEADER_KEY.role) as UserRole) || 'anonymous';
  const studentType = headerList.get(HEADER_KEY.studentType) as StudentType;
  const specialization = headerList.get(
    HEADER_KEY.specialization
  ) as Specialization;

  const result = await getDatabaseInformations(studentNumber);

  const props = {
    role,
    specialization,
    studentType,
    studentNumber,
    userId,
    ...result,
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider>
          <Suspense fallback={<Loading />}>
            <StoreProvider {...props}>{children}</StoreProvider>
          </Suspense>
        </ClerkProvider>
      </body>
    </html>
  );
}
