import { z } from 'zod';

export type StudentType = z.infer<typeof studentTypeEnum>;

const studentTypeEnum = z.enum(['regular', 'irregular']);

export default studentTypeEnum;
