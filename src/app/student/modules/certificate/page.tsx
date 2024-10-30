import Header from '@/components/Header';
import Loading from '@/components/Loading';
import CertificateConfirmation from '@/features/certificate/student/components/CertificateConfirmation';
import CertificateLoader from '@/features/certificate/student/components/CertificateLoader';
import CertificateSelector from '@/features/certificate/student/components/CertificateSelector';
import certificateTest from '@/features/certificate/test/certificateTest';
import ModuleNav from '@/features/modules/student/components/ModuleNav';
import { Suspense } from 'react';

const Page = () => {
  console.log(certificateTest());
  return (
    <div>
      <Header />
      <ModuleNav />
      <Suspense fallback={<Loading />}>
        <CertificateSelector />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <CertificateLoader />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <CertificateConfirmation />
      </Suspense>
    </div>
  );
};

export default Page;
