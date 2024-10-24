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
import React from 'react';

const Signin = () => {
  const dispatch = useAppDispatch();
  const router = useAppRouter();
  const rootState = useAppSelector((s) => s);
  const _userType = userType(rootState);
  const _studentType = studentType(rootState);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
      <Heading text="Signin" type="SUB_TITLE" />
      <Heading text={`User Type: ${_userType}`} type="SUB_TITLE" />
      <Heading text={`Student Type: ${_studentType}`} type="SUB_TITLE" />

      <div className="bg-violet-400">
        <form onSubmit={handleSubmit} className="grid grid-flow-row gap-4 p-2">
          <Input
            regExp={regExp.email}
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <Input
            regExp={/\D\d/g}
            minLength={8}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <div className="grid bg-violet-700">
            <button
              type="submit"
              className="h-12 rounded-lg bg-background px-2 py-1 text-foreground shadow-sm duration-300 ease-in-out hover:bg-blue-500"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
      <div className="grid bg-violet-500 p-2">
        <Heading text="Don't have an account?" type="SUB_TITLE" />
        <button
          onClick={() => router.replace('/student/signup')}
          className="h-12 rounded-lg bg-foreground px-2 py-1 text-background shadow-sm duration-300 ease-in-out hover:bg-blue-500 hover:text-foreground"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signin;
