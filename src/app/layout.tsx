import type { Metadata } from 'next';

import type { Children } from '@/utils/types/children';

import { ClerkProvider } from '@clerk/nextjs';
import localFont from 'next/font/local';
import { Suspense } from 'react';

import Loading from '@/components/Loading';
import StoreProvider from '@/components/StoreProvider';

import '@/app/globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';

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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<Loading />}>
          <ClerkProvider dynamic>
            <SidebarProvider>
              <StoreProvider>
                <AppSidebar />
                <main className="w-full">{children}</main>
              </StoreProvider>
            </SidebarProvider>
          </ClerkProvider>
        </Suspense>
      </body>
    </html>
  );
}
