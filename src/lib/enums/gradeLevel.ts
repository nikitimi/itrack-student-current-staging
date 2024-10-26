import { z } from 'zod';

export type GradeLevel = z.infer<typeof gradeLevelEnum>;

const gradeLevelEnum = z.enum([
  'FIRST_YEAR',
  'SECOND_YEAR',
  'THIRD_YEAR',
  'FOURTH_YEAR',
]);

export default gradeLevelEnum;
