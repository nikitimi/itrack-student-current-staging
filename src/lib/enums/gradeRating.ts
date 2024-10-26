import { z } from 'zod';

export type GradeRating = z.infer<typeof gradeRatingEnum>;

const gradeRatingEnum = z.enum(['A', 'B', 'C']);

export default gradeRatingEnum;
