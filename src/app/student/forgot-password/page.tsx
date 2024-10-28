'use client';

import Input from '@/components/Input';
import { useAppDispatch } from '@/hooks/redux';
import useAppRouter from '@/hooks/useAppRouter';
import { authenticationSetStatus } from '@/redux/reducers/authenticationReducer';
import regExp from '@/utils/regex';
import { useSignIn } from '@clerk/nextjs';
import React, { type FormEvent } from 'react';

const Page = () => {
  const { isLoaded, signIn } = useSignIn();
  const router = useAppRouter();
  const dispatch = useAppDispatch();

  async function initiateForgotPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isLoaded) return;

    const formdata = new FormData(event.currentTarget);

    try {
      const email = formdata.get('email');
      if (email === null) throw new Error('Email is null!');

      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email as string,
      });
      dispatch(authenticationSetStatus('verifying new password'));
      router.push('/student/verify-new-password');
    } catch (err) {
      console.log(err);
      alert('Invalid email.');
    }
  }

  return (
    <div>
      <form onSubmit={initiateForgotPassword}>
        <Input
          regExp={regExp.email}
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <button
          type="submit"
          className="h-12 rounded-lg bg-foreground px-2 py-1 text-background shadow-sm duration-300 ease-in-out hover:bg-blue-500 hover:text-foreground"
        >
          Forgot password?
        </button>
      </form>
    </div>
  );
};

export default Page;
