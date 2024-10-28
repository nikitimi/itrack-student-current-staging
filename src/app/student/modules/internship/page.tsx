import Header from '@/components/Header';
import ModuleNav from '@/features/modules/student/components/ModuleNav';
import InternshipTaskLoader from '@/features/internship/components/InternshipTaskLoader';
import InternshipTaskSelector from '@/features/internship/components/InternshipTaskSelector';
import React, { Suspense } from 'react';
import Loading from '@/components/Loading';
import InternshipTaskConfirmation from '@/features/internship/components/InternshipTaskConfirmation';
import InternshipIsITCompany from '@/features/internship/components/InternshipIsITCompany';
import InternshipGrade from '@/features/internship/components/internshipGrade';

const Internship = () => {
  return (
    <div>
      <Header />
      <ModuleNav />
      <h3 className="text-center font-geist-mono text-lg font-medium">
        Fill up internship form
      </h3>
      <Suspense fallback={<Loading />}>
        <InternshipIsITCompany />
        <InternshipGrade />
        <InternshipTaskSelector />
        <InternshipTaskLoader />
        <InternshipTaskConfirmation />
      </Suspense>
    </div>
  );
};

export default Internship;
