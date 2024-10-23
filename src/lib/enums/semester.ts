import { z } from 'zod';

const semesterEnum = z.enum(['FIRST_SEMESTER', 'SECOND_SEMESTER']);

export type Semester = z.infer<typeof semesterEnum>;
export default semesterEnum;
