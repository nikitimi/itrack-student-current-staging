import { Suspense } from 'react';
import Nav from '@/components/Nav';
import Loading from './Loading';
import AuthenticationHelper from './AuthenticationHelper';

const Header = async () => {
  return (
    <header>
      <p>Header</p>
      <Suspense fallback={<Loading />}>
        <Nav />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <AuthenticationHelper />
      </Suspense>
    </header>
  );
};

export default Header;
