import Header from '@/components/Header';
import Loading from '@/components/Loading';
import COGDataExtractor from '@/features/grade/student/components/COGDataExtractor';
import COGDataLoader from '@/features/grade/student/components/COGDataLoader';
import GradeConfirmation from '@/features/grade/student/components/GradeConfirmation';
import ModuleNav from '@/features/modules/student/components/ModuleNav';
import { Suspense } from 'react';

const Grade = () => {
  return (
    <>
      <Header />
      <ModuleNav />
      <Suspense fallback={<Loading />}>
        <COGDataExtractor />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <COGDataLoader />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <GradeConfirmation />
      </Suspense>
    </>
  );
};

export default Grade;
