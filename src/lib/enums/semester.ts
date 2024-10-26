import { z } from 'zod';

export type Semester = z.infer<typeof semesterEnum>;

const semesterEnum = z.enum(['FIRST_SEMESTER', 'SECOND_SEMESTER']);

export default semesterEnum;
