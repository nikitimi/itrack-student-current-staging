import type { StudentType } from '@/lib/enums/studentType';

/** The years it will take to finish BSIT Course. */
const BSITYears = 4;

export default function getStudentType(studentNumber: string) {
  const date = new Date();
  const year = date.getFullYear();
  const yearOfEnrollment = parseInt(studentNumber.substring(0, 4), 10);
  const yearOfCompletion = yearOfEnrollment + BSITYears;
  const studentType: StudentType =
    yearOfCompletion < year ? 'irregular' : 'regular';

  return studentType;
}
