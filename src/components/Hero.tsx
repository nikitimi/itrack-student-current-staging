'use client';

import { useAppSelector } from '@/hooks/redux';
import {
  studentInfoNumber,
  studentInfoFirstname,
  studentInfoLastname,
  studentInfoSpecialization,
  studentInfoType,
} from '@/redux/reducers/studentInfoReducer';
import { useEffect, useState } from 'react';
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
} from '@/components/ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';

type InitialState = 'loading' | 'ready';
const initialState = 'loading';

const Hero = () => {
  {
    /* <Button onClick={() => void signOut()}>Signout</Button> */
  }
  const [status, setStatus] = useState<InitialState>(initialState);
  const isReady = status === 'ready';
  const loadingText = 'loading...';

  const studentInfoSelector = useAppSelector((s) => s.studentInfo);
  const _studentNumber = studentInfoNumber(studentInfoSelector);
  const _specialization = studentInfoSpecialization(studentInfoSelector);
  const _studentType = studentInfoType(studentInfoSelector);
  const firstName = studentInfoFirstname(studentInfoSelector);
  const lastName = studentInfoLastname(studentInfoSelector);
  const fullName = `${firstName} ${lastName}`;

  useEffect(() => {
    setStatus('ready');
  }, []);

  if (isReady) {
    return (
      <Card className="lg:1/2 mx-auto h-auto md:w-3/4">
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
          <CardDescription>{`Welcome ${fullName}!`}</CardDescription>
        </CardHeader>
        <CardContent>
          <LabelHelper
            label="Specialization:"
            value={_specialization?.replace(/_/g, ' ')}
          />
          <LabelHelper label="Student Type:" value={_studentType} />
          <LabelHelper label="Student Number:" value={_studentNumber} />
        </CardContent>
      </Card>
    );
  }
  // TODO: Add loading here.
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Information</CardTitle>
        <CardDescription>
          All information you provided resides here...
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LabelHelper label="Specialization:" value={loadingText} />
        <LabelHelper label="Student Type:" value={loadingText} />
        <LabelHelper label="Student Number:" value={loadingText} />
      </CardContent>
    </Card>
  );
};

const LabelHelper = (props: { label: string; value: string }) => {
  return (
    <section className="grid grid-cols-2 items-center">
      <Label>{props.label}</Label>
      <Input value={props.value} className="border-none" disabled />
    </section>
  );
};

export default Hero;
