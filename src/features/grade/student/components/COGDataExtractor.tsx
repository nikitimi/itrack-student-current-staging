'use client';

import * as _subjects from '@/lib/calculations/grades';
import gradeLevel from '@/lib/enums/gradeLevel';
import semester from '@/lib/enums/semester';
import { EMPTY_STRING } from '@/utils/constants';
import { type FormEvent, useState } from 'react';
import { z } from 'zod';
import regExps from '@/features/grade/utils/regExps';
import subjectsHelper, {
  SubjectDetails,
} from '@/features/grade/utils/subjectsHelper';
import subjectsIndexIdentifier from '@/utils/subjectsIndexIdentifier';
import { ApiResponse } from '@/utils/types/apiResponse';
import type { ExtractedCOGData } from '@/lib/schema/apiDataResponse/extractedCOGData';

type YearLevel = z.infer<typeof gradeLevel>;
type Semester = z.infer<typeof semester>;

type FinalResult = {
  studentNumber: string;
  academicYear: string;
  semester: Semester;
  yearLevel: YearLevel;
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
  /** TODO: Link specialization here. */
  const targetSpecialization = 'BUSINESS_ANALYTICS' as const;
  const [state, setState] = useState(initialState);
  const subjectList = Object.entries(_subjects)
    .sort(
      (a, b) => subjectsIndexIdentifier(a[0]) - subjectsIndexIdentifier(b[0])
    )
    .map((s) => s[1]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState(initialState);
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

      if (errorMessage[0] !== EMPTY_STRING) {
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
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name="file" type="file" required />
        <button>Reveal</button>
      </form>
      {Object.entries(state).map(([k, v]) => {
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
