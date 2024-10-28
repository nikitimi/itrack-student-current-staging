'use client';

import AuthenticationHelper from '@/components/AuthenticationHelper';
import Heading from '@/components/Heading';
import Input from '@/components/Input';
import { useAppDispatch } from '@/hooks/redux';
import useAppRouter from '@/hooks/useAppRouter';
import {
  authenticationResetState,
  authenticationSetStatus,
} from '@/redux/reducers/authenticationReducer';
import regExp from '@/utils/regex';
import { useSignIn } from '@clerk/nextjs';
import React, { useEffect } from 'react';

const Signin = () => {
  const router = useAppRouter();
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    dispatch(authenticationResetState());
  }, [dispatch]);

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

        <button
          onClick={() => router.replace('/student/forgot-password')}
          className="h-12 rounded-lg bg-foreground px-2 py-1 text-background shadow-sm duration-300 ease-in-out hover:bg-blue-500 hover:text-foreground"
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
};

export default Signin;
