'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { type InternshipTask } from '@/lib/enums/internshipTask';
import {
  internshipModuleCompleted,
  internshipTaskRemove,
  internshipTasks,
} from '@/redux/reducers/internshipReducer';
import { EMPTY_STRING } from '@/utils/constants';

const InternshipTaskLoader = () => {
  const selector = useAppSelector((s) => s.internship);
  const _internshipTasks = internshipTasks(selector);
  const internshipModuleState = internshipModuleCompleted(selector);
  const isInternshipModuleCompleted = internshipModuleState === true;
  const dispatch = useAppDispatch();
  const nonAlphabetCharacters = /[()/]/g;

  function handleRemoveTask(task: InternshipTask) {
    const tableRow = document.querySelector(
      `tr#${task.replace(nonAlphabetCharacters, EMPTY_STRING)}`
    ) as HTMLTableRowElement;
    const toggleClasses = ['hidden'] as const;

    if (isInternshipModuleCompleted)
      return alert("You've already submitted your internship form.");

    tableRow.classList.toggle(...toggleClasses);
    dispatch(internshipTaskRemove(task));
  }

  return (
    <Card className="rounded-none border-none bg-transparent shadow-none">
      <CardHeader>
        <CardDescription>List of performed internship tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="text-center">
              <TableHead>Task name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {_internshipTasks.map((task) => {
              const taskName = task.replace(/_/g, ' ');
              return (
                <TableRow
                  key={task}
                  id={task.replace(nonAlphabetCharacters, EMPTY_STRING)}
                >
                  <TableCell className="capitalize text-foreground">
                    <p>{taskName.toLocaleLowerCase()}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-row justify-center gap-2 p-2">
                      <Button
                        disabled={isInternshipModuleCompleted}
                        onClick={() => handleRemoveTask(task)}
                        variant="destructive"
                      >
                        Remove
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default InternshipTaskLoader;
