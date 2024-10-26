import { z } from 'zod';

export type ParsingStatus = z.infer<typeof parsingStatusEnum>;

const parsingStatusEnum = z.enum(['header', 'body', 'footer']);

export default parsingStatusEnum;
