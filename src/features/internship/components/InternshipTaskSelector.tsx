'use client';

import Loading from '@/components/Loading';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { InternshipTask } from '@/lib/enums/internshipTask';
import internshipTaskEnum from '@/lib/enums/internshipTask';
import {
  internshipTaskAdd,
  internshipTasks,
} from '@/redux/reducers/internshipReducer';
import { FormEvent, Suspense, useRef } from 'react';

const InternshipTaskSelector = () => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const dispatch = useAppDispatch();
  const selector = useAppSelector((s) => s.internship);
  const _internshipTasks = internshipTasks(selector);

  function handleTaskAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formdata = new FormData(event.currentTarget);
      const selectedTask = formdata.get('selectedTask') as InternshipTask;

      if (_internshipTasks.includes(selectedTask)) {
        throw new Error(`${selectedTask.replace(/_/g, ' ')} already exists`);
      }

      dispatch(internshipTaskAdd(selectedTask));
      console.log(`${selectedTask} added`);
    } catch (e) {
      const error = e as Error;
      alert(error.message);
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full bg-violet-300">
        <div className="flex p-2">
          <div className="w-full">
            <div>
              <form onSubmit={handleTaskAdd}>
                <h3 className="text-center font-geist-mono text-lg font-medium">
                  Internship Task Selector
                </h3>
                <section className="grid grid-flow-col gap-2 p-2">
                  <select
                    name="selectedTask"
                    ref={selectRef}
                    className="h-12 rounded-lg bg-background p-2 text-foreground shadow-sm"
                  >
                    {internshipTaskEnum.options
                      .filter((task) => !_internshipTasks.includes(task))
                      .map((task) => {
                        const taskName = task.replace(/_/g, ' ');
                        return (
                          <option key={task} value={task}>
                            {taskName}
                          </option>
                        );
                      })}
                  </select>
                  <button
                    type="submit"
                    className="rounded-lg bg-green-300 px-2 py-1 text-background shadow-sm"
                  >
                    Add Task
                  </button>
                </section>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default InternshipTaskSelector;
