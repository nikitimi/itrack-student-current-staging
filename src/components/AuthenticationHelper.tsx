'use client';

import Heading from '@/components/Heading';
import { useAppSelector } from '@/hooks/redux';
import {
  authenticationUserID,
  authenticationUserType,
} from '@/redux/reducers/authenticationReducer';
import {
  studentInfoNumber,
  studentInfoSpecialization,
  studentInfoType,
} from '@/redux/reducers/studentInfoReducer';
import { useEffect, useState } from 'react';

type InitialState = 'loading' | 'ready';
const initialState = 'loading';

const AuthenticationHelper = () => {
  const [status, setStatus] = useState<InitialState>(initialState);
  const isReady = status === 'ready';

  const authenticationSelector = useAppSelector((s) => s.authentication);
  const _userId = authenticationUserID(authenticationSelector);
  const _userType = authenticationUserType(authenticationSelector);

  const studentInfoSelector = useAppSelector((s) => s.studentInfo);
  const _studentNumber = studentInfoNumber(studentInfoSelector);
  const _specialization = studentInfoSpecialization(studentInfoSelector);
  const _studentType = studentInfoType(studentInfoSelector);

  useEffect(() => {
    setStatus('ready');
  }, []);

  if (isReady) {
    return (
      <div>
        <Heading
          text={`Specialization: ${_specialization?.replace(/_/g, ' ')}`}
          type="SUB_TITLE"
        />
        <Heading text={`Student Type: ${_studentType}`} type="SUB_TITLE" />
        <Heading text={`Student Number: ${_studentNumber}`} type="SUB_TITLE" />
        <Heading text={`User ID: ${_userId}`} type="SUB_TITLE" />
        <Heading text={`User Type: ${_userType}`} type="SUB_TITLE" />
      </div>
    );
  }
  // TODO: Add loading here.
  return (
    <div>
      <Heading text={`Specialization: loading...`} type="SUB_TITLE" />
      <Heading text={`Student Type: loading...`} type="SUB_TITLE" />
      <Heading text={`Student Number: loading...`} type="SUB_TITLE" />
      <Heading text={`User ID: loading...`} type="SUB_TITLE" />
      <Heading text={`User Type: loading...`} type="SUB_TITLE" />
    </div>
  );
};

export default AuthenticationHelper;
