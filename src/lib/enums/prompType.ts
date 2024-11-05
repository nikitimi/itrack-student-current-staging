import { z } from 'zod';

export type PromptType = z.infer<typeof promptTypeEnum>;
const promptTypeEnum = z.enum(['waiting', 'show prompt', 'confirmed']);

export default promptTypeEnum;
