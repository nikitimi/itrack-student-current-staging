'server only';

import type { ExcelRowHelperParams } from '@/server/lib/schema/excelRowHelper';

export default function excelRowHelper(props: ExcelRowHelperParams) {
  const { gradeRating, job, specialization, subjectCode } = props;
  return {
    gradeRating,
    job,
    specialization,
    subjectCode,
  };
}
