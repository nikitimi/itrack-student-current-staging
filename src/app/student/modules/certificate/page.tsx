import Header from '@/components/Header';
import Loading from '@/components/Loading';
import CertificateLoader from '@/features/certificate/student/components/CertificateLoader';
import CertificateSelector from '@/features/certificate/student/components/CertificateSelector';
import ModuleNav from '@/features/grade/student/components/ModuleNav';
import React, { Suspense } from 'react';

const Certificate = () => {
  return (
    <div>
      <Header />
      <ModuleNav />
      <CertificateSelector />
      <CertificateLoader />
    </div>
  );
};

export default Certificate;
