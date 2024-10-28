'use client';

import { useAppDispatch } from '@/hooks/redux';
import { internshipGradeUpdate } from '@/redux/reducers/internshipReducer';
import { ChangeEvent } from 'react';

const InternshipGrade = () => {
  const dispatch = useAppDispatch();
  const errorClasses = ['border-red-400', 'text-red-400'];
  const successClasses = ['border-green-400', 'text-green-400'];

  function setErrorClasses(input: HTMLInputElement) {
    input.classList.add(...errorClasses);
    return input.classList.remove(...successClasses);
  }

  function setSuccessClasses(input: HTMLInputElement) {
    input.classList.add(...successClasses);
    return input.classList.remove(...errorClasses);
  }

  function handleGradeChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const number = parseInt(input.value, 10);

    if (isNaN(number)) return setErrorClasses(input);

    if (number > 100 || number < 0) return setErrorClasses(input);

    setSuccessClasses(input);
    dispatch(internshipGradeUpdate(number));
  }

  return (
    <div className="flex flex-col justify-center gap-4 bg-violet-400 p-4">
      <input
        required
        type="text"
        placeholder="Put your internship grade"
        className="h-12 rounded-lg border-4 bg-background p-2 text-foreground shadow-sm duration-300 ease-in-out"
        maxLength={3}
        onChange={handleGradeChange}
      />
    </div>
  );
};

export default InternshipGrade;
