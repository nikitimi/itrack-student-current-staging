import Header from '@/components/Header';
import COGDataExtractor from '@/features/grade/student/components/COGDataExtractor';
import ModuleNav from '@/features/modules/student/components/ModuleNav';
import React from 'react';

const Grade = () => {
  return (
    <>
      <Header />
      <ModuleNav />
      <COGDataExtractor />
    </>
  );
};

export default Grade;
