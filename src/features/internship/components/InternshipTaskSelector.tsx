'use client';

import Loading from '@/components/Loading';
import internshipTask from '@/lib/enums/internshipTask';
import React, { FormEvent, Suspense, useRef } from 'react';

const InternshipTaskSelector = () => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const internshipTasks = internshipTask.options;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData);
    alert(selectRef.current?.value);
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full bg-violet-300">
        <div className="flex p-2">
          <div className="w-full">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center gap-4 bg-violet-400 p-4"
            >
              <h3 className="text-center font-geist-mono text-lg font-medium">
                Fill up internship form
              </h3>
              <input
                required
                name="internship-grade"
                placeholder="Put your internship grade"
                className="h-12 rounded-lg bg-background p-2 text-foreground shadow-sm"
                type="text"
              />
              <div>
                <h3 className="text-center font-geist-mono text-lg font-medium">
                  Internship Task Selector
                </h3>
                <section className="grid grid-flow-col gap-2 p-2">
                  <select
                    name="task"
                    ref={selectRef}
                    className="h-12 rounded-lg bg-background p-2 text-foreground shadow-sm"
                  >
                    {internshipTasks.map((task) => {
                      const taskName = task.replace(/_/g, ' ');
                      return (
                        <option key={task} value={task}>
                          {taskName}
                        </option>
                      );
                    })}
                  </select>
                  <button
                    type="button"
                    className="rounded-lg bg-green-300 px-2 py-1 text-background shadow-sm"
                  >
                    Add Task
                  </button>
                </section>
              </div>
              <section>
                <h3 className="text-center font-geist-mono text-lg font-medium">
                  Is your internship inside a IT Company?
                </h3>
                <div className="grid grid-flow-col gap-2 p-2">
                  <button
                    type="button"
                    className="h-12 rounded-lg bg-green-400 px-2 py-1 shadow-sm"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="h-12 rounded-lg bg-red-400 px-2 py-1 shadow-sm"
                  >
                    No
                  </button>
                </div>
              </section>
            </form>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default InternshipTaskSelector;
