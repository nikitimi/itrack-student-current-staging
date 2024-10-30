'use client';

import type { GetStudentNumberResponse } from '@/server/lib/schema/apiResponse/getStudentNumber';

import { useSignUp } from '@clerk/nextjs';
import { useEffect, useState, type FormEvent } from 'react';

import AuthenticationHelper from '@/components/AuthenticationHelper';
import Heading from '@/components/Heading';
import Input, { errorClasses, validClasses } from '@/components/Input';
import useAppRouter from '@/hooks/useAppRouter';
import regExp from '@/utils/regex';
import specializationEnum, {
  type Specialization,
} from '@/lib/enums/specialization';

import { useAppDispatch } from '@/hooks/redux';
import { authenticationSetStatus } from '@/redux/reducers/authenticationReducer';
import {
  studentTemporarySetNumber,
  studentTemporarySetSpecialization,
} from '@/redux/reducers/studentTemporaryReducer';
import type StudentCreation from '@/utils/types/studentCreation';

type InitialState = {
  studentNumbers: StudentCreation['studentNumber'][];
};

/** Styling the password inputs inside the Sign Up page. */
function stylePasswordInputs(type?: 'error') {
  const passwordInputIds = ['password', 'confirmPassword'];
  const isTypeInFavorOfError = type === 'error';

  passwordInputIds.forEach((id) => {
    const input = document.querySelector(`input#${id}`) as HTMLInputElement;

    input.classList.add(
      ...(isTypeInFavorOfError ? errorClasses : validClasses)
    );
    input.classList.remove(
      ...(isTypeInFavorOfError ? validClasses : errorClasses)
    );
  });
}

const initialState: InitialState = {
  studentNumbers: [],
};

const Signup = () => {
  const router = useAppRouter();
  const { isLoaded, signUp } = useSignUp();
  const dispatch = useAppDispatch();
  const [state, setState] = useState(initialState);

  async function handleStudentCreation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const emailAddress = formdata.get('email') as string;
    const password = formdata.get('password') as string;
    const studentNumber = formdata.get('studentNumber') as string;
    const confirmPassword = formdata.get('confirmPassword') as string;
    const specialization = formdata.get('specialization') as Specialization;

    if (!isLoaded) return;

    try {
      if (state.studentNumbers.includes(studentNumber)) {
        throw new Error('Student number already exists!');
      }

      if (password !== confirmPassword) {
        throw new Error("Password doesn't match!");
      }

      stylePasswordInputs();
      const response = await signUp.create({
        emailAddress,
        password,
      });

      if (response === undefined) throw new Error('Signing in failed.');

      await response.prepareEmailAddressVerification();
      dispatch(studentTemporarySetNumber(studentNumber));
      dispatch(studentTemporarySetSpecialization(specialization));
      dispatch(authenticationSetStatus('verifying account'));
      router.push('/student/verify-email');
    } catch (err) {
      stylePasswordInputs('error');
      const error = err as { errors?: Record<string, string>[] };
      if (error.errors === undefined) {
        return alert(err);
      }
      alert(error.errors[0].message);
    }
  }

  useEffect(() => {
    async function getStudentNumbers() {
      try {
        const response = await fetch('/api/getStudentNumber', {
          method: 'GET',
        });
        const getStudentNumber =
          (await response.json()) as GetStudentNumberResponse;

        if (getStudentNumber.data.length === 0) return;
        console.log('Setting up student numbers.');
        setState((prevState) => ({
          ...prevState,
          studentNumbers: getStudentNumber.data,
        }));
      } catch (err) {
        console.log(err);
        alert('Error in fetching student numbers.');
      }
    }
    return void getStudentNumbers();
  }, []);

  return (
    <div>
      <Heading
        text={JSON.stringify(isLoaded ? signUp.status : 'loading status...')}
        type="TITLE"
      />
      <Heading text="Signup" type="TITLE" />
      <AuthenticationHelper />
      <form onSubmit={handleStudentCreation}>
        <div className="grid gap-4 bg-violet-500 p-2">
          <Input
            required
            regExp={new RegExp(regExp.studentNumber)}
            name="studentNumber"
            type="text"
            placeholder="Student number here 20xxxxxxxx"
            maxLength={10}
          />
          <Input
            required
            regExp={regExp.email}
            name="email"
            type="email"
            placeholder="Email"
          />
          <select
            name="specialization"
            required
            className="h-12 rounded-lg border-4 bg-foreground px-2 py-1 text-background shadow-sm duration-300 ease-in-out"
          >
            {specializationEnum.options.map((specialization) => {
              return (
                <option key={specialization} value={specialization}>
                  {specialization}
                </option>
              );
            })}
          </select>
          <input
            required
            name="password"
            type="password"
            id="password"
            placeholder="Password"
            className="h-12 rounded-lg border-4 bg-foreground px-2 py-1 text-background shadow-sm duration-300 ease-in-out"
          />
          <input
            required
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            className="h-12 rounded-lg border-4 bg-foreground px-2 py-1 text-background shadow-sm duration-300 ease-in-out"
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
