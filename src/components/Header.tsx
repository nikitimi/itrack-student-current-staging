'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import AppLogo from '@/components/AppLogo';
import { Button } from './ui/button';
import useAppRouter from '@/hooks/useAppRouter';

const Header = () => {
  return (
    <header className="w-full shadow-md">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <SidebarTrigger />
        </ResizablePanel>
        <ResizableHandle disabled />
        <ResizablePanel defaultSize={50} />
      </ResizablePanelGroup>
    </header>
  );
};

export const HeaderNoUser = () => {
  const router = useAppRouter();
  return (
    <header className="p-4 shadow-md">
      <Button
        variant="secondary"
        onClick={() => router.push('/student/signin')}
      >
        <AppLogo />
      </Button>
    </header>
  );
};

export default Header;
