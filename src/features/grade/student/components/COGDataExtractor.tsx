'use client';

import type GradeInfo from '@/utils/types/gradeInfo';

import * as _subjects from '@/lib/calculations/grades';
import gradeLevel from '@/lib/enums/gradeLevel';
import semester, { type Semester } from '@/lib/enums/semester';
import regExps from '@/features/grade/student/utils/regExps';
import subjectsHelper from '@/features/grade/student/utils/subjectsHelper';
import subjectsIndexIdentifier from '@/utils/subjectsIndexIdentifier';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { grades, gradesAdd } from '@/redux/reducers/gradeReducer';
import { WRONG_NUMBER } from '@/utils/constants';
import regex from '@/utils/regex';
import {
  studentInfoNumber,
  studentInfoSpecialization,
} from '@/redux/reducers/studentInfoReducer';
import { Specialization } from '@/lib/enums/specialization';
import { ExtractedCOGDataResponse } from '@/server/lib/schema/extractedCOGData';

type ExtraProps = {
  yearLevelIndex: number;
};

const COGDataExtractor = () => {
  const selector = useAppSelector((s) => s.studentInfo);
  const studentNumber = studentInfoNumber(selector);
  const specialization = studentInfoSpecialization(selector);
  const subjectList = Object.entries(_subjects)
    .sort(
      (a, b) => subjectsIndexIdentifier(a[0]) - subjectsIndexIdentifier(b[0])
    )
    .map((s) => s[1]);
  const dispatch = useAppDispatch();
  const _grades = grades(useAppSelector((s) => s.grade));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
              const date = new Date();
              const { yearLevelIndex, ...rest } = {
                ...resultHolder,
                subjects,
              } as GradeInfo & ExtraProps;

              const isGradeExistInRecord =
                _grades.filter(
                  (g) =>
                    g.yearLevel === rest.yearLevel &&
                    g.semester === rest.semester
                ).length === 1;

              const STUDENT_NUMBER_TEST = '2021201282';
              // TODO: Put here the studentInfoNumber.
              if (rest.studentNumber !== STUDENT_NUMBER_TEST)
                throw new Error('The uploaded file is not your COG!');

              if (isGradeExistInRecord)
                throw new Error("You've already uploaded this COG!");

              console.log('removing ', yearLevelIndex);
              // TODO: Send to Database, maybe with Redux Saga?
              console.log({
                ...rest,
                dateCreated: date.getTime(),
                dateModified: -1,
              });
              dispatch(gradesAdd(rest));
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
    </>
  );
};

export default COGDataExtractor;
