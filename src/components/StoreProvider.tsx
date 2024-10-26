'use client';

import type { Children } from '@/utils/types/children';
import type { UserRole } from '@/lib/enums/userRole';

import { useEffect } from 'react';
import { Provider } from 'react-redux';

import { useAppDispatch } from '@/hooks/redux';
import {
  authenticationSetStudentNumber,
  authenticationSetStudentSpecialization,
  authenticationSetStudentType,
  authenticationSetUserID,
  authenticationSetUserType,
} from '@/redux/reducers/authenticationReducer';
import store from '@/redux/store';
import { EMPTY_STRING } from '@/utils/constants';
import type { StudentType } from '@/lib/enums/studentType';
import type { Specialization } from '@/lib/enums/specialization';

type StoreProviderParams = {
  userId: string | null;
  specialization: Specialization;
  studentType: StudentType;
  studentNumber: string;
  role: UserRole;
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

  useEffect(() => {
    dispatch(authenticationSetStudentSpecialization(specialization));
    dispatch(authenticationSetStudentType(studentType));
    dispatch(authenticationSetStudentNumber(parseInt(studentNumber, 10)));
    dispatch(authenticationSetUserType(role));
    dispatch(authenticationSetUserID(userId ?? EMPTY_STRING));
  }, [dispatch, role, specialization, studentNumber, studentType, userId]);

  return <>{children}</>;
};
