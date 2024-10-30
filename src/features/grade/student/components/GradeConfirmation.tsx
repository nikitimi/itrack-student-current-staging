'use client';

import { useAppSelector } from '@/hooks/redux';
import { grades } from '@/redux/reducers/gradeReducer';
import React from 'react';
import gradeResult from '../utils/gradeResult';

const GradeConfirmation = () => {
  const _grades = grades(useAppSelector((s) => s.grade));

  return (
    <div>
      <button onClick={() => console.log(gradeResult(_grades))}>Confirm</button>
    </div>
  );
};

export default GradeConfirmation;
