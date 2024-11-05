'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from '@/components/ui/select';
//eslint-disable-next-line boundaries/element-types
import gradeSystem from '@/features/grade/student/utils/gradeSystem';
import { useAppDispatch } from '@/hooks/redux';
import useInternshipInputControl from '@/hooks/useInternshipInputControl';
import { internshipGradeUpdate } from '@/redux/reducers/internshipReducer';

const InternshipGrade = () => {
  const dispatch = useAppDispatch();
  const { isInputDisabled } = useInternshipInputControl();
  const gradeScale = gradeSystem.flatMap((g) => g.scale);

  function handleGradeChange(value: (typeof gradeScale)[number]) {
    dispatch(internshipGradeUpdate(value));
  }

  return (
    <Card className="rounded-none border-none bg-transparent shadow-none">
      <CardHeader>
        <CardDescription>What is your internship grade?</CardDescription>
      </CardHeader>
      <CardContent>
        <Select
          onValueChange={handleGradeChange}
          required
          disabled={isInputDisabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="grade" />
          </SelectTrigger>
          <SelectContent>
            {gradeScale.map((v) => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default InternshipGrade;
