'use client';

import { useEffect, type FormEvent } from 'react';

import Input from '@/components/Input';
import type { UserRole } from '@/lib/enums/userRole';
import type { Specialization } from '@/lib/enums/specialization';
import { useSignIn } from '@clerk/nextjs';
import {
  authenticationSetStatus,
  authenticationStatus,
} from '@/redux/reducers/authenticationReducer';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import useAppRouter from '@/hooks/useAppRouter';
import { EMPTY_STRING } from '@/utils/constants';

export type StudentCreation = {
  role: UserRole;
  userId: string;
  studentNumber: string;
  specialization: Specialization;
};

const VerifyNewPassword = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useAppRouter();
  const dispatch = useAppDispatch();
  const selector = useAppSelector((s) => s.authentication);
  const _authenticationStatus = authenticationStatus(selector);

  if (
    window !== undefined &&
    _authenticationStatus !== 'verifying new password'
  )
    return router.back();

  async function confirmForgotPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isLoaded) return;

    try {
      const formdata = new FormData(event.currentTarget);
      const password = formdata.get('password') as string;
      const confirmPassword = formdata.get('confirmPassword');
      if (password !== confirmPassword)
        throw new Error("Password doesn't match!");

      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code: formdata.get('code') as string,
        password,
      });

      setActive({ session: result.createdSessionId }).finally(() => {
        dispatch(authenticationSetStatus('authenticated'));
      });
    } catch (e) {
      const error = e as Error;
      alert(
        error.message === EMPTY_STRING
          ? 'Password needs to be 8 characters long, or stronger!'
          : error.message
      );
    }
  }

  return (
    <div>
      <form onSubmit={confirmForgotPassword}>
        <Input
          regExp={/\d{6}/}
          type="text"
          name="code"
          placeholder="Verification code xxxxxx"
          maxLength={6}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          required
        />
        <button
          type="submit"
          className="h-12 rounded-lg bg-foreground px-2 py-1 text-background shadow-sm duration-300 ease-in-out hover:bg-blue-500 hover:text-foreground"
        >
          Submit code
        </button>
      </form>
    </div>
  );
};

export default VerifyNewPassword;
