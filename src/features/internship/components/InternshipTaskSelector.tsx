'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { InternshipTask } from '@/lib/enums/internshipTask';
import internshipTaskEnum from '@/lib/enums/internshipTask';
import {
  internshipModuleCompleted,
  internshipTaskAdd,
  internshipTasks,
} from '@/redux/reducers/internshipReducer';
import { SelectValue } from '@radix-ui/react-select';
import { FormEvent } from 'react';

const InternshipTaskSelector = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((s) => s.internship);
  const _internshipTasks = internshipTasks(selector);
  const _internshipModuleCompleted = internshipModuleCompleted(selector);
  const isInternshipModuleCompleted = _internshipModuleCompleted === true;

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
    <Card className="rounded-none border-none bg-transparent shadow-none">
      <form onSubmit={handleTaskAdd}>
        <CardHeader>
          <CardDescription>Internship Task Selector</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2">
          <Select name="selectedTask" disabled={isInternshipModuleCompleted}>
            <SelectTrigger>
              <SelectValue placeholder="Internship Tasks" />
            </SelectTrigger>
            <SelectContent>
              {internshipTaskEnum.options
                .filter((task) => !_internshipTasks.includes(task))
                .map((task) => {
                  const taskName = task.replace(/_/g, ' ');
                  return (
                    <SelectItem key={task} value={task}>
                      {taskName}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            type="submit"
            disabled={isInternshipModuleCompleted}
          >
            Add Task
          </Button>
        </CardContent>
      </form>
    </Card>
  );
};

export default InternshipTaskSelector;
