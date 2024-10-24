'use client';

import Heading from '@/components/Heading';
import Input from '@/components/Input';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import useAppRouter from '@/hooks/useAppRouter';
import {
  authenticationSetStudentType,
  authenticationSetUserType,
  studentType,
  userType,
} from '@/redux/reducers/authenticationReducer';
import regExp from '@/utils/regex';
import type { FormEvent } from 'react';

const Signup = () => {
  const dispatch = useAppDispatch();
  const router = useAppRouter();
  const rootState = useAppSelector((s) => s);
  const _userType = userType(rootState);
  const _studentType = studentType(rootState);

  /** TODO: Can be move to server for dynamic value.*/
  const studentNumberRegExp = `(20)(\\d{8})`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(new FormData(event.currentTarget));
    switch (_userType) {
      case 'admin':
        dispatch(authenticationSetStudentType('irregular'));
        return dispatch(authenticationSetUserType('anonymous'));
      case 'student':
        dispatch(authenticationSetStudentType('regular'));
        return dispatch(authenticationSetUserType('admin'));
      case 'anonymous':
        dispatch(authenticationSetStudentType('null'));
        return dispatch(authenticationSetUserType('student'));
    }
  }

  return (
    <div>
      <Heading text="Signup" type="SUB_TITLE" />
      <Heading text={`User Type: ${_userType}`} type="SUB_TITLE" />
      <Heading text={`Student Type: ${_studentType}`} type="SUB_TITLE" />
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 bg-violet-500 p-2">
          <Input
            required
            regExp={new RegExp(studentNumberRegExp)}
            name="studentNumber"
            type="text"
            placeholder="Student Number"
            maxLength={10}
          />
          <Input
            required
            regExp={regExp.email}
            name="email"
            type="email"
            placeholder="Email"
          />
          <input
            required
            name="password"
            type="password"
            placeholder="Password"
            className="h-12 rounded-lg bg-foreground px-2 py-1 text-background shadow-sm duration-300 ease-in-out"
          />
          <input
            required
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="h-12 rounded-lg bg-foreground px-2 py-1 text-background shadow-sm duration-300 ease-in-out"
          />
        </div>
        <div className="grid bg-violet-500 p-2">
          <button
            type="submit"
            className="h-12 rounded-lg bg-foreground px-2 py-1 text-background shadow-sm duration-300 ease-in-out hover:bg-blue-500 hover:text-foreground"
          >
            Sign Up
          </button>
        </div>
      </form>
      <div className="grid bg-violet-400 p-2">
        <Heading text="Already have an account?" type="SUB_TITLE" />
        <button
          onClick={() => router.replace('/student/signin')}
          className="h-12 rounded-lg bg-background px-2 py-1 text-foreground shadow-sm duration-300 ease-in-out hover:bg-blue-500"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Signup;
