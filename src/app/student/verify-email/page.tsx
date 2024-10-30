'use client';

import { type FormEvent } from 'react';

import Input from '@/components/Input';
import type { UserRole } from '@/lib/enums/userRole';
import type { Specialization } from '@/lib/enums/specialization';
import { useSignUp } from '@clerk/nextjs';
import {
  authenticationSetStatus,
  authenticationStatus,
} from '@/redux/reducers/authenticationReducer';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import useAppRouter from '@/hooks/useAppRouter';
import {
  studentTemporaryNumber,
  studentTemporaryResetState,
  studentTemporarySpecialization,
} from '@/redux/reducers/studentTemporaryReducer';

export type StudentCreation = {
  role: UserRole;
  userId: string;
  studentNumber: string;
  specialization: Specialization;
};

const VerifyEmail = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useAppRouter();
  const dispatch = useAppDispatch();
  const studentInfoSelector = useAppSelector((s) => s.studentTemporary);
  const _studentInfoNumber = studentTemporaryNumber(studentInfoSelector);
  const _studentInfoSpecialization =
    studentTemporarySpecialization(studentInfoSelector);
  const _authenticationStatus = authenticationStatus(
    useAppSelector((s) => s.authentication)
  );

  if (_authenticationStatus !== 'verifying account') return router.back();

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

      dispatch(studentTemporaryResetState());
      dispatch(authenticationSetStatus('authenticated'));
      setActive({ session: result.createdSessionId });
    } catch (err) {
      console.log(err);
      alert('Error in processing verification code.');
    }
  }

  return (
    <div>
      <form
        onSubmit={handleVerificationCode}
        // className={`${isVerificationModalVisible ? 'opacity-100' : 'opacity-0'} duration-300 ease-in-out`}
      >
        <Input
          name="code"
          // disabled={!isVerificationModalVisible}
          regExp={/\d{6}/}
          placeholder="Verification code xxxxxx"
          maxLength={6}
          type="text"
        />
        <button
          // disabled={!isVerificationModalVisible}
          type="submit"
          className="h-12 rounded-lg bg-foreground px-2 py-1 text-background shadow-sm duration-300 ease-in-out hover:bg-blue-500 hover:text-foreground"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;
