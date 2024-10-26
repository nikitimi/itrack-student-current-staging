'use client';

import Heading from '@/components/Heading';
import {
  specialization,
  studentNumber,
  studentType,
  userId,
  userType,
} from '@/redux/reducers/authenticationReducer';
import { useAppSelector } from '@/hooks/redux';
import { useEffect, useState } from 'react';

type InitialState = 'loading' | 'ready';
const initialState = 'loading';

const AuthenticationHelper = () => {
  const [status, setStatus] = useState<InitialState>(initialState);
  const selector = useAppSelector((s) => s.authentication);
  const isReady = status === 'ready';

  const _studentType = studentType(selector);
  const _studentNumber = studentNumber(selector);
  const _userId = userId(selector);
  const _userType = userType(selector);
  const _specialization = specialization(selector);

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
