'use client';

import AuthenticationHelper from '@/components/AuthenticationHelper';
import Heading from '@/components/Heading';
import Input from '@/components/Input';
import useAppRouter from '@/hooks/useAppRouter';
import regExp from '@/utils/regex';
import { useSignIn } from '@clerk/nextjs';
import React from 'react';

const Signin = () => {
  const router = useAppRouter();
  const { signIn, isLoaded, setActive } = useSignIn();

  async function handleSignin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isLoaded) return console.log('clerk is still loading');

    const formdata = new FormData(event.currentTarget);
    try {
      const result = await signIn.create({
        identifier: formdata.get('email') as string,
        password: formdata.get('password') as string,
      });

      switch (result.status) {
        case 'complete':
          setActive({ session: result.createdSessionId });
          return router.replace('/student');
        default:
          console.log(result.status);
      }
    } catch (err) {
      console.log(err);
      alert("This account doesn't exists!");
    }
  }

  async function initiateForgotPassword(
    event: React.FormEvent<HTMLFormElement>
  ) {
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
    } catch (err) {
      console.log(err);
      alert('Invalid email.');
    }
  }

  async function confirmForgotPassword(
    event: React.FormEvent<HTMLFormElement>
  ) {
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
      setActive({ session: result.createdSessionId });
    } catch (err) {
      console.log(err);
      alert('Failed in resetting password!');
    }
  }

  return (
    <div>
      <Heading text="Signin" type="SUB_TITLE" />
      <AuthenticationHelper />
      <div className="bg-violet-400">
        <form onSubmit={handleSignin} className="grid grid-flow-row gap-4 p-2">
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
    </div>
  );
};

export default Signin;
