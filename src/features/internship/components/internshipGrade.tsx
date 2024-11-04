'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  internshipGradeUpdate,
  internshipModuleCompleted,
} from '@/redux/reducers/internshipReducer';
import { ChangeEvent } from 'react';

const InternshipGrade = () => {
  const dispatch = useAppDispatch();
  const _internshipModuleCompleted = internshipModuleCompleted(
    useAppSelector((s) => s.internship)
  );
  const isInternshipModuleCompleted = _internshipModuleCompleted === true;
  const errorClasses = ['border-red-400', 'text-red-400'];
  const successClasses = ['border-green-400', 'text-green-400'];

  function setErrorClasses(input: HTMLInputElement) {
    input.classList.add(...errorClasses);
    return input.classList.remove(...successClasses);
  }

  function setSuccessClasses(input: HTMLInputElement) {
    input.classList.add(...successClasses);
    return input.classList.remove(...errorClasses);
  }

  function handleGradeChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const number = parseInt(input.value, 10);

    if (isNaN(number)) return setErrorClasses(input);

    if (number > 100 || number < 0) return setErrorClasses(input);

    setSuccessClasses(input);
    dispatch(internshipGradeUpdate(number));
  }

  return (
    <Card className="rounded-none border-none bg-transparent shadow-none">
      <CardHeader>
        <CardDescription>What is your internship grade?</CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          required
          type="text"
          placeholder="Grade"
          className="h-12 rounded-lg border-4 bg-background p-2 text-foreground shadow-sm duration-300 ease-in-out"
          maxLength={3}
          disabled={isInternshipModuleCompleted}
          onChange={handleGradeChange}
        />
      </CardContent>
    </Card>
  );
};

export default InternshipGrade;
