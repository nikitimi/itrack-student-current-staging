import Header from '@/components/Header';
import CertificateLoader from '@/features/certificate/student/components/CertificateLoader';
import CertificateSelector from '@/features/certificate/student/components/CertificateSelector';
import ModuleNav from '@/features/modules/student/components/ModuleNav';
import React from 'react';

const Certificate = () => {
  return (
    <div>
      <Header />
      <ModuleNav />
      <CertificateSelector />
      <CertificateLoader />
      <div className="w-full bg-violet-500 p-2">
        <div className="grid">
          <button className="h-12 rounded-lg bg-background px-2 py-1 text-foreground shadow-sm duration-300 ease-in-out hover:bg-green-600">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
