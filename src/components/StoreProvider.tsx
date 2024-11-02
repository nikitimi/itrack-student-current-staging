'use client';

import type { UserRole } from '@/lib/enums/userRole';
import type { StudentType } from '@/lib/enums/studentType';
import type { Specialization } from '@/lib/enums/specialization';
import type { Certificate } from '@/lib/enums/certificate';
import type { MongoExtra } from '@/lib/schema/mongoExtra';
import type { Children } from '@/utils/types/children';
import type GradeInfo from '@/utils/types/gradeInfo';

import { useEffect } from 'react';
import { Provider } from 'react-redux';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  authenticationSetUserID,
  authenticationSetUserType,
} from '@/redux/reducers/authenticationReducer';
import { certificateModuleStateUpdate } from '@/redux/reducers/certificateReducer';
import { certificateAdd } from '@/redux/reducers/certificateReducer';
import { grades, gradesAdd } from '@/redux/reducers/gradeReducer';
import store from '@/redux/store';
import {
  studentInfoSetNumber,
  studentInfoSetSpecialization,
  studentInfoSetType,
} from '@/redux/reducers/studentInfoReducer';
import { EMPTY_STRING } from '@/utils/constants';
import { InternshipResult } from '@/utils/types/internshipResult';
import {
  internshipCompanyQuestionUpdate,
  internshipGradeUpdate,
  internshipSetCompletion,
  internshipTaskAdd,
} from '@/redux/reducers/internshipReducer';

type StoreProviderParams = {
  userId: string | null;
  specialization: Specialization;
  studentType: StudentType;
  studentNumber: string;
  role: UserRole;
  grades: (GradeInfo & MongoExtra)[];
  certificate: Certificate[];
  internship?: Omit<InternshipResult, 'status'> & MongoExtra;
} & Children;

export default function StoreProvider({
  children,
  ...rest
}: StoreProviderParams) {
  return (
    <Provider store={store}>
      <StoreInitializer {...rest}>{children}</StoreInitializer>
    </Provider>
  );
}

const StoreInitializer = ({ children, ...rest }: StoreProviderParams) => {
  const { role, specialization, studentType, studentNumber, userId } = rest;
  const dispatch = useAppDispatch();
  const _grades = grades(useAppSelector((s) => s.grade));

  // This will control the state of the app whether the students can input in the forms.
  useEffect(() => {
    if (rest.certificate.length > 0) {
      dispatch(certificateModuleStateUpdate(true));
      rest.certificate.forEach((certificate) =>
        dispatch(certificateAdd(certificate))
      );
    }
  }, [rest.certificate, _grades, dispatch]);
  useEffect(
    () => rest.grades.forEach((gradeInfo) => dispatch(gradesAdd(gradeInfo))),

    [rest.grades, _grades, dispatch]
  );
  useEffect(() => {
    if (rest.internship !== undefined) {
      const { isITCompany, grade, tasks } = rest.internship;
      dispatch(internshipCompanyQuestionUpdate(isITCompany));
      dispatch(internshipGradeUpdate(grade));
      tasks.forEach((task) => {
        dispatch(internshipTaskAdd(task));
      });
      dispatch(internshipSetCompletion(true));
    }
  }, [rest.internship, dispatch]);

  useEffect(() => {
    dispatch(studentInfoSetSpecialization(specialization));
    dispatch(studentInfoSetType(studentType));
    dispatch(studentInfoSetNumber(studentNumber));
    dispatch(authenticationSetUserType(role));
    dispatch(authenticationSetUserID(userId ?? EMPTY_STRING));
  }, [dispatch, role, specialization, studentNumber, studentType, userId]);

  return <>{children}</>;
};
