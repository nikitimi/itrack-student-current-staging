'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  internshipCompanyQuestion,
  internshipGrade,
  internshipSetCompletion,
  internshipTasks,
} from '@/redux/reducers/internshipReducer';
import type { InternshipResult } from '@/utils/types/internshipResult';
import React, { useState } from 'react';
import gradeDivision from '../utils/gradeDivision';
import internship from '@/lib/calculations/internship';

const InternshipTaskConfirmation = () => {
  const [isTaskAlertPrompted, setTaskAlertPromp] = useState(false);
  const dispatch = useAppDispatch();
  const selector = useAppSelector((s) => s.internship);
  const _internshipCompanyQuestion = internshipCompanyQuestion(selector);
  const _internshipGrade = internshipGrade(selector);
  const _internshipTasks = internshipTasks(selector);

  async function handleInternshipSubmit() {
    try {
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

      const internshipResult: InternshipResult = {
        tasks: _internshipTasks,
        isITCompany: _internshipCompanyQuestion,
        grade: _internshipGrade,
        status: 'completed',
      };
      const date = new Date();
      const WRONG_NUMBER = -1;

      // TODO: Put to Database.
      console.log({
        ...internshipResult,
        dateCreated: date.getTime(),
        dateModified: WRONG_NUMBER,
      });

      // CHECKING
      const getOneThird = 0.0001;
      const thirtyThreeDecimal = parseInt(gradeDivision, 10) * getOneThird;
      const isITCompanyGrade = internshipResult.isITCompany ? 50 : 100;

      // TODO: Put here the specialization of the student.
      const filteredInternshipCalculation = internship.filter(
        (info) => info.specialization === 'BUSINESS_ANALYTICS'
      );
      const internshipCalculationFilteredToTasks = filteredInternshipCalculation
        .map((info) => {
          if (internshipResult.tasks.indexOf(info.task) !== -1) {
            return info;
          }
        })
        .filter((i) => i !== undefined);
      console.log(
        isITCompanyGrade * thirtyThreeDecimal,
        internshipResult.grade * thirtyThreeDecimal,
        internshipCalculationFilteredToTasks,
        thirtyThreeDecimal
      );

      dispatch(internshipSetCompletion(true));
    } catch (e) {
      const error = e as Error;
      alert(error.message);
    }
  }

  return (
    <div className="w-full bg-violet-800 p-2">
      <div className="grid">
        <button
          className="h-12 rounded-lg bg-background px-2 py-1 text-foreground shadow-sm duration-300 ease-in-out hover:bg-green-600 hover:text-white"
          onClick={handleInternshipSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default InternshipTaskConfirmation;
