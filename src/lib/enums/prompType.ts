import { z } from 'zod';

export type PromptType = z.infer<typeof promptTypeEnum>;
const promptTypeEnum = z.enum([
  'fetching',
  'no document',
  'showing prompt',
  'submitted',
  'fetched from server',
]);

export default promptTypeEnum;
