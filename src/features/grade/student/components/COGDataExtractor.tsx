'use client';

import type { Specialization } from '@/lib/enums/specialization';
import type { ExtractedCOGDataResponse } from '@/server/lib/schema/extractedCOGData';

import React, { useState } from 'react';

import * as _subjects from '@/lib/calculations/grades';
import gradeLevel, { type GradeLevel } from '@/lib/enums/gradeLevel';
import semester, { type Semester } from '@/lib/enums/semester';
import regExps from '@/features/grade/student/utils/regExps';
import subjectsHelper, {
  SubjectDetails,
} from '@/features/grade/student/utils/subjectsHelper';
import subjectsIndexIdentifier from '@/utils/subjectsIndexIdentifier';
import { WRONG_NUMBER } from '@/utils/constants';
import regex from '@/utils/regex';
import { useAppSelector } from '@/hooks/redux';
import {
  studentInfoNumber,
  studentInfoSpecialization,
} from '@/redux/reducers/studentInfoReducer';

type FinalResult = {
  studentNumber: string;
  academicYear: string;
  semester: Semester;
  yearLevel: GradeLevel;
  subjects: { code: SubjectDetails['subjectCode']; grade: string }[];
};

const initialState: FinalResult = {
  semester: 'FIRST_SEMESTER',
  studentNumber: '',
  academicYear: '',
  yearLevel: 'FIRST_YEAR',
  subjects: [],
};

const COGDataExtractor = () => {
  const selector = useAppSelector((s) => s.studentInfo);
  const studentNumber = studentInfoNumber(selector);
  const specialization = studentInfoSpecialization(selector);
  const [state, setState] = useState(initialState);
  const subjectList = Object.entries(_subjects)
    .sort(
      (a, b) => subjectsIndexIdentifier(a[0]) - subjectsIndexIdentifier(b[0])
    )
    .map((s) => s[1]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState(initialState);
    let resultHolder = {
      semester: 'FIRST_SEMESTER',
      yearLevelIndex: WRONG_NUMBER,
    };

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch('/api/extractPDFData', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const { data, errorMessage } =
        (await response.json()) as ExtractedCOGDataResponse;
      const { header, body } = data;

      if (errorMessage.length > 0) {
        throw new Error('Error in the SERVER response.');
      }
      for (const { name, target, regExp } of regExps) {
        let value = header.match(regExp)?.[0] as string;
        const isStudentNumber = regex.studentNumber.test(value);
        const isSemester = name === 'semester';
        const isYearlevel = name === 'yearLevel';

        switch (target) {
          case 'header':
            if (isSemester || isYearlevel) {
              const number = parseInt(value, 10);
              const index = number - 1;
              const chooseEnum = isSemester ? semester : gradeLevel;

              // Year and Semester number validation.
              // if (isNaN(number)) {
              //   console.log(`Error in parsing the number in ${name}`);
              // }
              if (isYearlevel) {
                resultHolder = {
                  ...resultHolder,
                  yearLevelIndex: index,
                };
              }

              value = chooseEnum.options[index];
            }
            if (isStudentNumber && value !== studentNumber) {
              throw new Error(
                `Your student number is    ${studentNumber}\nCOG's student number is: ${value}\nPlease use your own COG.`
              );
            }
            resultHolder = { ...resultHolder, [name]: value };
            break;

          case 'body':
            if (typeof resultHolder.yearLevelIndex === 'number') {
              const subjectArgument = {
                body,
                semester: resultHolder?.semester as Semester,
                subjects: subjectList[resultHolder.yearLevelIndex],
                targetSpecialization: specialization as Specialization,
              };

              const codes = subjectsHelper(subjectArgument);

              const subjects = body.match(regExp)!.map((grade, i) => ({
                grade,
                code: codes[i],
              }));

              setState(
                (prevState) =>
                  ({
                    ...prevState,
                    ...resultHolder,
                    subjects,
                  }) as FinalResult
              );
            }
            break;
        }
      }
    } catch (e) {
      const error = e as Error;
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name="file" type="file" required />
        <button>Reveal</button>
      </form>
      {Object.entries(state).map(([k, v]) => {
        if (k === 'yearLevelIndex') return <p key={k}></p>;

        const stringfied = typeof v === 'string' ? v : JSON.stringify(v);

        return (
          <p key={k} className="flex justify-between p-4 capitalize">
            {k}:<span>{stringfied}</span>
          </p>
        );
      })}
    </>
  );
};

export default COGDataExtractor;
