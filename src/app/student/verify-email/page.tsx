'use client';

import { type FormEvent } from 'react';

import { useSignUp } from '@clerk/nextjs';
import {
  authenticationSetStatus,
  authenticationStatus,
} from '@/redux/reducers/authenticationReducer';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import useAppRouter from '@/hooks/useAppRouter';
import {
  studentTemporaryFirstname,
  studentTemporaryLastname,
  studentTemporaryNumber,
  studentTemporaryResetState,
  studentTemporarySpecialization,
} from '@/redux/reducers/studentTemporaryReducer';
import type StudentCreation from '@/utils/types/studentCreation';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import OTP from '@/components/OTP';

const VerifyEmail = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useAppRouter();
  const dispatch = useAppDispatch();
  const studentInfoSelector = useAppSelector((s) => s.studentTemporary);
  const _studentInfoNumber = studentTemporaryNumber(studentInfoSelector);
  const firstName = studentTemporaryFirstname(studentInfoSelector);
  const lastName = studentTemporaryLastname(studentInfoSelector);
  const _studentInfoSpecialization =
    studentTemporarySpecialization(studentInfoSelector);
  const _authenticationStatus = authenticationStatus(
    useAppSelector((s) => s.authentication)
  );

  if (window !== undefined && _authenticationStatus !== 'verifying account')
    return router.back();

  async function handleVerificationCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const code = formData.get('code') as string;

    if (!isLoaded) return;

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.createdUserId === null) {
        throw new Error('Created User ID is null!');
      }

      const studentData: StudentCreation = {
        role: 'student',
        lastName,
        firstName,
        userId: result.createdUserId,
        studentNumber: _studentInfoNumber.toLocaleString(),
        specialization: _studentInfoSpecialization,
      };
      const response = await fetch('/api/addUserType', {
        method: 'POST',
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error('Error in assigning role to the student.');
      }
      setActive({ session: result.createdSessionId }).finally(() => {
        dispatch(studentTemporaryResetState());
        dispatch(authenticationSetStatus('authenticated'));
      });
    } catch (err) {
      console.log(err);
      alert('Error in processing verification code.');
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-3/4 p-4">
        <CardDescription>
          <CardTitle>Account Verification</CardTitle>
          <CardDescription>
            We&apos;ve sent verification code to the email you&apos;ve provided.
          </CardDescription>
        </CardDescription>
        <CardContent>
          <form onSubmit={handleVerificationCode} className="grid gap-2">
            <OTP />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
