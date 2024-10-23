import type * as subjects from '@/lib/calculations/grades';
import type { Semester } from '@/lib/enums/semester';
import type { Specialization } from '@/lib/enums/specialization';

export type SubjectDetails =
  | (typeof subjects.firstYearSubjects)[number]
  | (typeof subjects.secondYearSubjects)[number]
  | (typeof subjects.thirdYearSubjects)[number]
  | (typeof subjects.fourthYearSubjects)[number];

type SubjectsHelperProps = {
  semester: Semester;
  targetSpecialization: Specialization;
  body: string;
  subjects: SubjectDetails[];
};

/** Returns the Subject code arranged by index,
 * Can be improved to fetch the name, status, and the credits of the subject.
 */
function subjectsHelper(props: SubjectsHelperProps) {
  const result: {
    subjectCode: SubjectDetails['subjectCode'];
    index: number;
  }[] = [];
  const subjects = props.subjects.filter(
    ({ academicYear, specialization }) =>
      academicYear.semester === props.semester &&
      specialization === props.targetSpecialization
  );
  const filteredSubjectSource = Array.from(
    new Set(subjects.map(({ subjectCode }) => subjectCode))
  );
  filteredSubjectSource.forEach((subjectCode) => {
    const formattedSubjectCode = subjectCode.replace(/_/g, ' ');
    const index = props.body.indexOf(formattedSubjectCode);

    if (!props.body.match(formattedSubjectCode)) return;
    if (result.filter((s) => subjectCode === s.subjectCode).length === 0)
      result.push({ subjectCode, index });
  });

  return result
    .sort((a, b) => a.index - b.index)
    .map(({ subjectCode }) => subjectCode);
}

export default subjectsHelper;