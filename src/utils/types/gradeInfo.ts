import type { Semester } from '@/lib/enums/semester';
import type { GradeLevel } from '@/lib/enums/gradeLevel';
import type * as subjects from '@/lib/calculations/grades';

export type SubjectDetails =
  | (typeof subjects.firstYearSubjects)[number]
  | (typeof subjects.secondYearSubjects)[number]
  | (typeof subjects.thirdYearSubjects)[number]
  | (typeof subjects.fourthYearSubjects)[number];

type GradeInfo = {
  studentNumber: string;
  academicYear: string;
  semester: Semester;
  yearLevel: GradeLevel;
  subjects: { code: SubjectDetails['subjectCode']; grade: string }[];
};

export default GradeInfo;
