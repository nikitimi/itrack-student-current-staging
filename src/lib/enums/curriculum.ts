import { z } from 'zod';

export type Curriculum = z.infer<typeof curriculumEnum>;

const curriculumEnum = z.enum(['2018 Curriculum']);

export default curriculumEnum;
