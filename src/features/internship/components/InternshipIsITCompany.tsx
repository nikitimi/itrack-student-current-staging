'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  internshipCompanyQuestionUpdate,
  internshipModuleCompleted,
} from '@/redux/reducers/internshipReducer';

const InternshipIsITCompany = () => {
  const dispatch = useAppDispatch();
  const yesOrNo = ['yes', 'no'] as const;
  const _internshipModuleCompleted = internshipModuleCompleted(
    useAppSelector((s) => s.internship)
  );
  const isInternshipModuleCompleted = _internshipModuleCompleted === true;

  function setIsITState(yesNo: (typeof yesOrNo)[number]) {
    dispatch(internshipCompanyQuestionUpdate(yesNo === 'yes'));
  }

  return (
    <Card className="rounded-none border-none bg-transparent shadow-none">
      <CardHeader>
        <CardTitle>Internship Form</CardTitle>
        <CardDescription>
          Is your internship inside a IT Company?
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-flow-col gap-2 p-2">
        {yesOrNo.map((yesNo) => {
          const isYes = yesNo === 'yes';
          return (
            <Button
              key={yesNo}
              type="button"
              className="capitalize"
              disabled={isInternshipModuleCompleted}
              variant={isYes ? 'outline' : 'destructive'}
              onClick={() => setIsITState(yesNo)}
            >
              {yesNo}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default InternshipIsITCompany;
