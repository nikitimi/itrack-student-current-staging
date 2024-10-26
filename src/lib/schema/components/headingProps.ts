import { z } from 'zod';

export const headingTypeEnum = z.enum(['TITLE', 'SUB_TITLE']);
export const headingAlignmentEnum = z.enum(['START', 'CENTER', 'END']);
export type HeadingType = z.infer<typeof headingTypeEnum>;
export type HeadingAlignment = z.infer<typeof headingAlignmentEnum>;
