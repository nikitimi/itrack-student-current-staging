'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  internshipCompanyQuestion,
  internshipGrade,
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
import useInternshipInputControl from '@/hooks/useInternshipInputControl';
import disabledWriteInDB from '@/utils/disabledWriteInDB';
import { inputControlSetPromptType } from '@/redux/reducers/inputControlReducer';
import Prompt from '@/components/Prompt';

const InternshipTaskConfirmation = () => {
  const [isTaskAlertPrompted, setTaskAlertPromp] = useState(false);
  const dispatch = useAppDispatch();
  const selector = useAppSelector((s) => s.internship);
  const _internshipCompanyQuestion = internshipCompanyQuestion(selector);
  const _internshipGrade = internshipGrade(selector);
  const _internshipTasks = internshipTasks(selector);
  const { isInputDisabled, internshipInputControl } =
    useInternshipInputControl();
  const studentNumber = studentInfoNumber(useAppSelector((s) => s.studentInfo));

  async function handleInternshipSubmit() {
    dispatch(
      inputControlSetPromptType({
        key: 'internshipModule',
        promptType: 'fetching',
      })
    );
    try {
      if (disabledWriteInDB.includes(internshipInputControl)) {
        throw new Error("You've already submitted your internship details.");
      }
      // Check if already submitted  document.
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

      if (_internshipCompanyQuestion === 'initializing') {
        throw new Error(
          'You forgot to answer whether your internship is from a IT Company or not.'
        );
      }
      if (_internshipGrade === 'initializing') {
        throw new Error('You forgot to input your internship grade.');
      }
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
      const json = (await response.json()) as BaseAPIResponse<string>;

      if (!response.ok) throw new Error(json.errorMessage[0]);

      dispatch(
        inputControlSetPromptType({
          key: 'internshipModule',
          promptType: 'submitted',
        })
      );
    } catch (e) {
      dispatch(
        inputControlSetPromptType({
          key: 'internshipModule',
          promptType: 'no document',
        })
      );
      const error = e as Error;
      alert(error.message);
    }
  }

  return (
    <Prompt
      description={
        "Are you sure you've entered all the details during your internship?"
      }
      promptKey={'certificateModule'}
      title={'Internship Details Confirmation'}
      trigger={
        <Card className="grid rounded-none border-none bg-transparent p-2 shadow-none">
          <Button disabled={isInputDisabled}>Submit internship details</Button>
        </Card>
      }
      handleConfirmation={handleInternshipSubmit}
    />
  );
};

export default InternshipTaskConfirmation;
