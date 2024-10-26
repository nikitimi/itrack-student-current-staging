import { z } from 'zod';

export type ExcelRowHelperParams = z.infer<typeof excelRowHelperSchema>;

const excelRowHelperSchema = z.object({
  gradeRating: z.string(),
  job: z.string(),
  specialization: z.string(),
  subjectCode: z.string(),
});

export default excelRowHelperSchema;
