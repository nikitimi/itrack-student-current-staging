'use client';

import { Suspense } from 'react';
import Image from 'next/image';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from '@/components/ui/sidebar';
import Nav from '@/components/Nav';
import NavProjectsSkeleton from '@/components/NavProjectsSkeleton';
import SignoutButton from '@/components/SignoutButton';
import { useAppSelector } from '@/hooks/redux';
import { authenticationStatus } from '@/redux/reducers/authenticationReducer';

const AppSidebar = () => {
  const backgroundClasses = 'bg-slate-50';
  const selector = useAppSelector((s) => s.authentication);
  const authState = authenticationStatus(selector);
  const acceptedRenderState = ['authenticated', 'initializing'];

  if (!acceptedRenderState.includes(authState)) return <></>;

  return (
    <Sidebar>
      <SidebarHeader className={backgroundClasses}>
        <div className="h-auto w-32">
          <Image
            src="/itrack-removebg.png"
            width={80}
            height={60}
            alt="logo"
            className="h-auto w-auto"
          />
        </div>
      </SidebarHeader>
      <SidebarContent className={backgroundClasses}>
        <SidebarGroup>
          <SidebarGroupLabel>Routes</SidebarGroupLabel>
          <SidebarGroupContent>
            <Suspense fallback={<NavProjectsSkeleton />}>
              <Nav />
            </Suspense>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className={backgroundClasses}>
        <SignoutButton />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
