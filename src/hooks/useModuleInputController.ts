'use client';

import { useAppSelector } from '@/hooks/redux';
import { grades } from '@/redux/reducers/gradeReducer';

import { certificateModuleCompleted } from '@/redux/reducers/certificateReducer';
import { internshipModuleCompleted } from '@/redux/reducers/internshipReducer';
import { NUMBER_OF_SEMESTER } from '@/utils/constants';

const useModuleInputController = () => {
  const _certificateModuleCompleted = certificateModuleCompleted(
    useAppSelector((s) => s.certificate)
  );
  const _grades = grades(useAppSelector((s) => s.grade));
  const _internshipModuleCompleted = internshipModuleCompleted(
    useAppSelector((s) => s.internship)
  );
  const isCertificateModuleCompleted = _certificateModuleCompleted === true;
  const isInternshipModuleCompleted = _internshipModuleCompleted === true;
  const isGradesModuleCompleted = _grades.length === NUMBER_OF_SEMESTER;

  return {
    isCertificateModuleCompleted,
    isInternshipModuleCompleted,
    isGradesModuleCompleted,
  };
};

export default useModuleInputController;
