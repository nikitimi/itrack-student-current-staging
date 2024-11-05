'use client';

import type { UserRole } from '@/lib/enums/userRole';
import type { StudentType } from '@/lib/enums/studentType';
import type { Specialization } from '@/lib/enums/specialization';
import type { Certificate } from '@/lib/enums/certificate';
import type { MongoExtra } from '@/lib/schema/mongoExtra';
import type { Children } from '@/utils/types/children';
import type GradeInfo from '@/utils/types/gradeInfo';

import { useCallback, useEffect } from 'react';
import { Provider } from 'react-redux';

import { useAppDispatch } from '@/hooks/redux';
import {
  authenticationSetStatus,
  authenticationSetUserID,
  authenticationSetUserType,
} from '@/redux/reducers/authenticationReducer';
import { certificateAdd } from '@/redux/reducers/certificateReducer';
import { gradesAdd } from '@/redux/reducers/gradeReducer';
import store from '@/redux/store';
import {
  studentInfoSetChartData,
  studentInfoSetFirstname,
  studentInfoSetLastname,
  studentInfoSetNumber,
  studentInfoSetSpecialization,
  studentInfoSetType,
} from '@/redux/reducers/studentInfoReducer';
import { EMPTY_STRING } from '@/utils/constants';
import { InternshipResult } from '@/utils/types/internshipResult';
import {
  internshipCompanyQuestionUpdate,
  internshipGradeUpdate,
  internshipTaskAdd,
} from '@/redux/reducers/internshipReducer';
import { ChartData } from '@/utils/types/chartData';
import { BaseAPIResponse } from '@/server/lib/schema/apiResponse';
import { useAuth } from '@clerk/nextjs';
import { inputControlSetPromptType } from '@/redux/reducers/inputControlReducer';

type LayoutFetcher = {
  userId: string | null;
  specialization: Specialization;
  studentType: StudentType;
  studentNumber: string;
  role: UserRole;
  grades: (GradeInfo & MongoExtra)[];
  certificate: Certificate[];
  internship?: Omit<InternshipResult, 'status'> & MongoExtra;
  firstName: string;
  lastName: string;
  chartData: ChartData[];
};

export default function StoreProvider({ children }: Children) {
  return (
    <Provider store={store}>
      <StoreInitializer>{children}</StoreInitializer>
    </Provider>
  );
}

const StoreInitializer = ({ children }: Children) => {
  const dispatch = useAppDispatch();
  const { userId } = useAuth();

  const fetchLayoutHelper = useCallback(async () => {
    const response = await fetch('/api/initializeApp', {
      method: 'GET',
    });
    const json = (await response.json()) as BaseAPIResponse<LayoutFetcher>;

    if (!response.ok) {
      return json.errorMessage.forEach((errorMessage) =>
        console.log(errorMessage)
      );
    }
    if (typeof userId !== 'string') {
      dispatch(authenticationSetStatus('no user'));
    }

    const {
      certificate,
      grades,
      internship,
      chartData,
      role,
      specialization,
      studentNumber,
      studentType,
      lastName,
      firstName,
    } = json.data;

    dispatch(authenticationSetUserID(userId ?? EMPTY_STRING));
    dispatch(authenticationSetStatus('authenticated'));
    dispatch(authenticationSetUserType(role));
    dispatch(studentInfoSetNumber(studentNumber));
    dispatch(studentInfoSetSpecialization(specialization));
    dispatch(studentInfoSetFirstname(firstName));
    dispatch(studentInfoSetLastname(lastName));
    dispatch(studentInfoSetType(studentType));

    if (certificate.length > 0) {
      certificate.forEach((certificate) =>
        dispatch(certificateAdd(certificate))
      );
      dispatch(
        inputControlSetPromptType({
          key: 'certificateModule',
          promptType: 'fetched from server',
        })
      );
    } else {
      dispatch(
        inputControlSetPromptType({
          key: 'certificateModule',
          promptType: 'no document',
        })
      );
    }

    if (internship !== undefined) {
      const { isITCompany, grade, tasks } = internship;
      dispatch(internshipCompanyQuestionUpdate(isITCompany));
      dispatch(internshipGradeUpdate(grade));
      tasks.forEach((task) => {
        dispatch(internshipTaskAdd(task));
      });
      dispatch(
        inputControlSetPromptType({
          key: 'internshipModule',
          promptType: 'fetched from server',
        })
      );
    } else {
      dispatch(
        inputControlSetPromptType({
          key: 'internshipModule',
          promptType: 'no document',
        })
      );
    }

    grades.forEach((gradeInfo) => dispatch(gradesAdd(gradeInfo)));
    chartData.forEach((c) => dispatch(studentInfoSetChartData(c)));
  }, [dispatch, userId]);

  useEffect(() => void fetchLayoutHelper(), [fetchLayoutHelper]);

  return <>{children}</>;
};
