'use client';

import { useAppSelector } from '@/hooks/redux';
import { grades } from '@/redux/reducers/gradeReducer';
import React from 'react';
import gradeResult from '../utils/gradeResult';
import { studentInfoSpecialization } from '@/redux/reducers/studentInfoReducer';

const GradeConfirmation = () => {
  const _grades = grades(useAppSelector((s) => s.grade));
  const specialization = studentInfoSpecialization(
    useAppSelector((s) => s.studentInfo)
  );

  return (
    <div>
      <button
        onClick={() =>
          console.log(gradeResult({ grades: _grades, specialization }))
        }
      >
        Confirm
      </button>
    </div>
  );
};

export default GradeConfirmation;
