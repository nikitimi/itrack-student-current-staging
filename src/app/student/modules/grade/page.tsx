import { Suspense } from 'react';

import Header from '@/components/Header';
import Loading from '@/components/Loading';
import COGDataExtractor from '@/features/grade/student/components/COGDataExtractor';
import COGDataLoader from '@/features/grade/student/components/COGDataLoader';

const Grade = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <Suspense fallback={<Loading />}>
          <COGDataExtractor />
        </Suspense>
      </Suspense>
      <Suspense fallback={<Loading />}>
        <COGDataLoader />
      </Suspense>
    </>
  );
};

export default Grade;
