'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAppDispatch } from '@/hooks/redux';
import useInternshipInputControl from '@/hooks/useInternshipInputControl';
import { internshipCompanyQuestionUpdate } from '@/redux/reducers/internshipReducer';

const InternshipIsITCompany = () => {
  const dispatch = useAppDispatch();
  const yesOrNo = ['yes', 'no'] as const;
  const { isInputDisabled } = useInternshipInputControl();

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
              disabled={isInputDisabled}
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
