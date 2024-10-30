'use client';

import type GradeInfo from '@/utils/types/gradeInfo';

import React, { useEffect, useState } from 'react';

import { useAppSelector } from '@/hooks/redux';
import { grades } from '@/redux/reducers/gradeReducer';
import Loading from '@/components/Loading';

type SortingConfig = {
  key: keyof GradeInfo;
  direction: 'ascending' | 'descending';
};

const COGDataLoader = () => {
  const _grades = grades(useAppSelector((s) => s.grade));
  const [state, setState] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortingConfig | null>(null);
  const globalUnderscoreRegex = /_/g;
  const SPACE_STRING = ' ';
  const addSubjectTDClasses = ['pb-10', 'opacity-100'];
  const hideSubjectTDClasses = ['h-2', 'select-none', 'opacity-0'];

  const sortedGrades = React.useMemo(() => {
    const sortableGrades = [..._grades];
    if (sortConfig !== null) {
      console.log({ sortConfig });
      sortableGrades.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableGrades;
  }, [_grades, sortConfig]);

  const requestSort = (key: SortingConfig['key']) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => setState(true), []);

  if (state) {
    return (
      <div>
        <table className="w-full bg-white">
          <thead>
            <tr className="flex items-center justify-between bg-green-500/80 p-2 font-geist-sans text-black/60">
              <th>
                <button onClick={() => requestSort('yearLevel')}>
                  Year Level
                </button>
              </th>
              <th>
                <button onClick={() => requestSort('academicYear')}>
                  Academic Year
                </button>
              </th>
              <th>
                <button onClick={() => requestSort('semester')}>
                  Semester
                </button>
              </th>
              <th>Subjects</th>
              <th className="hidden">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedGrades.map((gradeInfo) => {
              const { academicYear, yearLevel, semester, subjects } = gradeInfo;
              const identifier = `${yearLevel}-${semester}`;

              function initializeSubjectTDClasses(arrayOfClasses: string[]) {
                const baseClasses = 'duration-200 ease-out';
                const convertedClasses = arrayOfClasses
                  .toLocaleString()
                  .replace(/,/g, SPACE_STRING);

                return `${baseClasses} ${convertedClasses}`;
              }

              return (
                <tr
                  key={identifier}
                  className="relative flex items-start justify-between bg-slate-300 p-2 font-geist-mono text-xs text-black odd:bg-slate-200"
                >
                  <td>
                    {yearLevel.replace(globalUnderscoreRegex, SPACE_STRING)}
                  </td>
                  <td>{academicYear}</td>
                  <td>
                    {semester.replace(globalUnderscoreRegex, SPACE_STRING)}
                  </td>
                  <td
                    id={identifier}
                    className={initializeSubjectTDClasses(hideSubjectTDClasses)}
                  >
                    {subjects.map((subject) => {
                      const { code, grade } = subject;
                      return (
                        <div
                          key={code}
                          className="flex items-center justify-between"
                        >
                          <p className="font-bold">
                            {code.replace(globalUnderscoreRegex, SPACE_STRING)}
                          </p>
                          <p>{grade}</p>
                        </div>
                      );
                    })}
                  </td>
                  <td className="absolute bottom-0 right-2">
                    <button
                      aria-expanded="false"
                      className="h-8 w-24 rounded-lg bg-blue-500 px-2 py-1 capitalize text-white shadow-sm duration-200 ease-in"
                      onClick={(event) => {
                        try {
                          event.preventDefault();
                          const button =
                            event.currentTarget as HTMLButtonElement;
                          const tr = document.querySelector(
                            `td#${identifier}`
                          ) as HTMLTableRowElement | null;

                          if (tr === null)
                            throw new Error(
                              `Subjects table elements ${identifier} is empty!`
                            );

                          // Styling the table toggle.
                          addSubjectTDClasses.forEach((styleClass) =>
                            tr.classList.toggle(styleClass)
                          );
                          hideSubjectTDClasses.forEach((styleClass) =>
                            tr.classList.toggle(styleClass)
                          );
                          const isShowing = button.textContent === 'show';
                          button.textContent = isShowing ? 'collapse' : 'show';
                          button.setAttribute(
                            'aria-expanded',
                            JSON.stringify(isShowing)
                          );
                        } catch (e) {
                          const error = e as Error;
                          console.log(error.message);
                        }
                      }}
                    >
                      show
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  return <Loading />;
};

export default COGDataLoader;
