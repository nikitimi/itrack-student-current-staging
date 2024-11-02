import Header from '@/components/Header';
import Loading from '@/components/Loading';
import ModuleNav from '@/features/modules/student/components/ModuleNav';
import ModuleResults from '@/features/modules/student/components/ModuleResults';
import { Suspense } from 'react';

const Modules = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={<Loading />}>
        <ModuleNav />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <ModuleResults />
      </Suspense>
    </div>
  );
};

export default Modules;
