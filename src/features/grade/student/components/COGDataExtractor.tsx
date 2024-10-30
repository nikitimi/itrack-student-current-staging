'use client';

import type { ExtractedCOGData } from '@/lib/schema/apiDataResponse/extractedCOGData';
import type GradeInfo from '@/utils/types/gradeInfo';

import * as _subjects from '@/lib/calculations/grades';
import gradeLevel from '@/lib/enums/gradeLevel';
import semester, { type Semester } from '@/lib/enums/semester';
import { type FormEvent } from 'react';
import regExps from '@/features/grade/student/utils/regExps';
import subjectsHelper from '@/features/grade/student/utils/subjectsHelper';
import subjectsIndexIdentifier from '@/utils/subjectsIndexIdentifier';
import { ApiResponse } from '@/utils/types/apiResponse';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { grades, gradesAdd } from '@/redux/reducers/gradeReducer';

type ExtraProps = {
  yearLevelIndex: number;
};

const COGDataExtractor = () => {
  /** TODO: Link specialization here. */
  const targetSpecialization = 'BUSINESS_ANALYTICS' as const;
  const subjectList = Object.entries(_subjects)
    .sort(
      (a, b) => subjectsIndexIdentifier(a[0]) - subjectsIndexIdentifier(b[0])
    )
    .map((s) => s[1]);
  const dispatch = useAppDispatch();
  const _grades = grades(useAppSelector((s) => s.grade));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let resultHolder = {
      semester: 'FIRST_SEMESTER',
      yearLevelIndex: -1,
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
        (await response.json()) as ApiResponse<ExtractedCOGData>;
      const { header, body } = data;

      if (errorMessage.length > 0) {
        throw new Error('Error in the SERVER response.');
      }
      for (const { name, target, regExp } of regExps) {
        let value = header.match(regExp)?.[0] as string;
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
            resultHolder = { ...resultHolder, [name]: value };
            break;

          case 'body':
            if (typeof resultHolder.yearLevelIndex === 'number') {
              const subjectArgument = {
                body,
                semester: resultHolder?.semester as Semester,
                subjects: subjectList[resultHolder.yearLevelIndex],
                targetSpecialization,
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
      alert(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="file" type="file" required />
      <button
        type="submit"
        className="h-12 rounded-lg border bg-foreground px-2 py-1 text-background shadow-sm duration-300 ease-in-out hover:border-blue-600 hover:bg-blue-500 hover:text-slate-300"
      >
        Reveal
      </button>
    </form>
  );
};

export default COGDataExtractor;
