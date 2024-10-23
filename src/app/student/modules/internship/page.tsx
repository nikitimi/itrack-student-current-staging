import Header from '@/components/Header';
import ModuleNav from '@/features/modules/student/components/ModuleNav';
import InternshipTaskLoader from '@/features/internship/components/InternshipTaskLoader';
import InternshipTaskSelector from '@/features/internship/components/InternshipTaskSelector';
import React from 'react';

const Internship = () => {
  return (
    <div>
      <Header />
      <ModuleNav />
      <InternshipTaskSelector />
      <InternshipTaskLoader />
      <div className="w-full bg-violet-800 p-2">
        <div className="grid">
          <button
            type="submit"
            className="h-12 rounded-lg bg-background px-2 py-1 text-foreground shadow-sm duration-300 ease-in-out hover:bg-green-600 hover:text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Internship;
