import { z } from 'zod';

export type SubjecIdentifier = z.infer<typeof subjectIdentifierEnum>;

const subjectIdentifierEnum = z.enum(['first', 'second', 'third', 'fourth']);

export default subjectIdentifierEnum;
