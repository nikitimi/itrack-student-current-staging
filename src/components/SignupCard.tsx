'use client';

import type { GetStudentNumberResponse } from '@/server/lib/schema/apiResponse/getStudentNumber';

import { useSignUp } from '@clerk/nextjs';
import { useEffect, useState, type FormEvent } from 'react';

import Heading from '@/components/Heading';
import { Input } from '@/components/ui/input';
import useAppRouter from '@/hooks/useAppRouter';
import regExp from '@/utils/regex';
import specializationEnum, {
  type Specialization,
} from '@/lib/enums/specialization';

import { useAppDispatch } from '@/hooks/redux';
import { authenticationSetStatus } from '@/redux/reducers/authenticationReducer';
import {
  studentTemporarySetFirstname,
  studentTemporarySetLastname,
  studentTemporarySetNumber,
  studentTemporarySetSpecialization,
} from '@/redux/reducers/studentTemporaryReducer';
import type StudentCreation from '@/utils/types/studentCreation';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Select, SelectContent, SelectItem } from '@/components/ui/select';
import { SelectTrigger, SelectValue } from '@/components/ui/select';
import handleInputChange, {
  errorClasses,
  validClasses,
} from '@/utils/handleInputChange';

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

const SignupCard = () => {
  const router = useAppRouter();
  const { isLoaded, signUp } = useSignUp();
  const dispatch = useAppDispatch();
  const [state, setState] = useState(initialState);

  async function handleStudentCreation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const firstName = formdata.get('firstName') as string;
    const lastName = formdata.get('lastName') as string;
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
      dispatch(studentTemporarySetFirstname(firstName));
      dispatch(studentTemporarySetLastname(lastName));
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

        if (
          getStudentNumber.data.length > 0 &&
          typeof getStudentNumber.data[0] === 'string'
        ) {
          setState((prevState) => ({
            ...prevState,
            studentNumbers: getStudentNumber.data as string[],
          }));
        }
      } catch (err) {
        console.log(err);
        alert('Error in fetching student numbers.');
      }
    }
    return void getStudentNumbers();
  }, []);

  useEffect(() => {
    dispatch(authenticationSetStatus('no user'));
  }, [dispatch]);

  return (
    <Card>
      <CardHeader>
        <Heading text="Signup" type="TITLE" />
      </CardHeader>
      <CardContent>
        <form onSubmit={handleStudentCreation}>
          <div className="grid gap-4 p-2">
            <Input
              required
              onChange={(e) => handleInputChange(e, /[A-Za-z ]*/)}
              name="firstName"
              type="text"
              placeholder="First name"
            />
            <Input
              required
              onChange={(e) => handleInputChange(e, /[A-Za-z ]*/)}
              name="lastName"
              type="text"
              placeholder="Last name"
            />
            <Input
              required
              onChange={(e) =>
                handleInputChange(e, new RegExp(regExp.studentNumber))
              }
              name="studentNumber"
              type="text"
              placeholder="Student number here 20xxxxxxxx"
              maxLength={10}
            />
            <Input
              required
              onChange={(e) => handleInputChange(e, regExp.email)}
              name="email"
              type="email"
              placeholder="Email"
            />
            <Select name="specialization" required>
              <SelectTrigger>
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                {specializationEnum.options.map((specialization) => {
                  return (
                    <SelectItem key={specialization} value={specialization}>
                      {specialization}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <Input
              required
              name="password"
              type="password"
              id="password"
              placeholder="Password"
            />
            <Input
              required
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
            />
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </CardContent>
      <CardFooter className="grid">
        <CardDescription className="text-center">
          Already have an account?
        </CardDescription>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.replace('/student/signin')}
        >
          Sign In
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignupCard;
