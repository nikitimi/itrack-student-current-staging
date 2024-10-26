'use client';

import Loading from '@/components/Loading';
import internshipTask from '@/lib/enums/internshipTask';
import React, { Suspense } from 'react';

const InternshipTaskLoader = () => {
  const internshipTasks = internshipTask.options;
  return (
    <Suspense fallback={<Loading />}>
      <div className="bg-violet-600 p-2">
        <h3 className="text-center font-geist-mono text-lg font-medium">
          Internship tasks done
        </h3>
        <section className="h-80 overflow-y-auto bg-violet-500 p-4">
          <table className="w-full">
            <thead>
              <tr>
                <th>Task name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {internshipTasks.map((task) => {
                const taskName = task.replace(/_/g, ' ');
                return (
                  <tr
                    id={task}
                    key={task}
                    className="h-12 rounded-lg bg-background px-2 py-1 shadow-sm"
                  >
                    <td className="text-foreground">
                      <p className="text-center">{taskName}</p>
                    </td>
                    <td>
                      <div className="flex flex-row justify-center gap-2 p-2">
                        <button
                          className="h-12 rounded-lg bg-red-400 px-2 py-1 shadow-sm"
                          onClick={() => {
                            const tableRow = document.querySelector(
                              `tr#${task}`
                            ) as HTMLTableRowElement;
                            const toggleClasses = ['hidden'] as const;

                            tableRow.classList.toggle(...toggleClasses);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
    </Suspense>
  );
};

export default InternshipTaskLoader;
