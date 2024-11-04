'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  internshipCompanyQuestion,
  internshipGrade,
  internshipModuleCompleted,
  internshipSetCompletion,
  internshipTasks,
} from '@/redux/reducers/internshipReducer';
import type { InternshipResult } from '@/utils/types/internshipResult';
import { useState } from 'react';
import fetchHelper from '@/utils/fetch';
import { studentInfoNumber } from '@/redux/reducers/studentInfoReducer';
import { BaseAPIResponse } from '@/server/lib/schema/apiResponse';
import { InternshipTask } from '@/lib/enums/internshipTask';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const InternshipTaskConfirmation = () => {
  const [isTaskAlertPrompted, setTaskAlertPromp] = useState(false);
  const dispatch = useAppDispatch();
  const selector = useAppSelector((s) => s.internship);
  const _internshipCompanyQuestion = internshipCompanyQuestion(selector);
  const _internshipGrade = internshipGrade(selector);
  const _internshipTasks = internshipTasks(selector);
  const _internshipModuleCompleted = internshipModuleCompleted(selector);
  const isInternshipModuleCompleted = _internshipModuleCompleted === true;
  const studentNumber = studentInfoNumber(useAppSelector((s) => s.studentInfo));

  async function handleInternshipSubmit() {
    try {
      if (isInternshipModuleCompleted)
        throw new Error("You've already submitted your internship details.");

      const getInternship = await fetchHelper('/api/mongo/internship', 'GET', {
        studentNumber,
      });
      const { errorMessage } = (await getInternship.json()) as BaseAPIResponse<
        Omit<InternshipTask, 'status'>
      >;
      // Data exists.
      if (errorMessage.length === 0) {
        throw new Error("You've already posted your internship details.");
      }

      if (_internshipCompanyQuestion === 'initializing')
        throw new Error('You forgot to answer IT Company?');
      if (_internshipGrade === 'initializing')
        throw new Error('You forgot to input your internship grade.');
      if (_internshipTasks.length === 0 && !isTaskAlertPrompted) {
        setTaskAlertPromp(true);
        throw new Error(
          "Are you sure you didn't performed any task during internship?\nPress submit again to confirm."
        );
      }

      const result: Omit<InternshipResult, 'status'> = {
        tasks: _internshipTasks,
        isITCompany: _internshipCompanyQuestion,
        grade: _internshipGrade,
      };

      const response = await fetchHelper('/api/mongo/internship', 'POST', {
        ...result,
        studentNumber,
      });

      if (!response.ok) {
        const { errorMessage } =
          (await response.json()) as BaseAPIResponse<string>;
        throw new Error(errorMessage[0]);
      }
      dispatch(internshipSetCompletion(true));
    } catch (e) {
      const error = e as Error;
      alert(error.message);
    }
  }

  return (
    <Card className="grid rounded-none border-none bg-transparent p-2 shadow-none">
      <Button
        disabled={isInternshipModuleCompleted}
        onClick={handleInternshipSubmit}
      >
        Submit internship details
      </Button>
    </Card>
  );
};

export default InternshipTaskConfirmation;
