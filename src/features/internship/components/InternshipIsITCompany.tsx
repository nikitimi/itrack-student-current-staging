'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  internshipCompanyQuestionUpdate,
  internshipModuleCompleted,
} from '@/redux/reducers/internshipReducer';
import React from 'react';

const InternshipIsITCompany = () => {
  const dispatch = useAppDispatch();
  const yesOrNo = ['yes', 'no'] as const;
  const baseButtonClasses = 'h-12 rounded-lg  px-2 py-1 shadow-sm';
  const _internshipModuleCompleted = internshipModuleCompleted(
    useAppSelector((s) => s.internship)
  );
  const isInternshipModuleCompleted = _internshipModuleCompleted === true;

  function dynamicClasses(bool: boolean) {
    return bool ? 'bg-green-400' : 'bg-red-400';
  }

  function setIsITState(yesNo: (typeof yesOrNo)[number]) {
    dispatch(internshipCompanyQuestionUpdate(yesNo === 'yes'));
  }

  return (
    <section>
      <h3 className="text-center font-geist-mono text-lg font-medium">
        Is your internship inside a IT Company?
      </h3>
      <div className="grid grid-flow-col gap-2 p-2">
        {yesOrNo.map((yesNo) => {
          const isYes = yesNo === 'yes';
          return (
            <button
              key={yesNo}
              type="button"
              disabled={isInternshipModuleCompleted}
              className={`${dynamicClasses(isYes)} ${baseButtonClasses}`}
              onClick={() => setIsITState(yesNo)}
            >
              {yesNo}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default InternshipIsITCompany;
