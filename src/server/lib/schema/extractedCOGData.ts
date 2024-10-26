import type { BaseAPIResponse } from '@/server/lib/schema/apiResponse';

import { z } from 'zod';

export type ExtractedCOGDataResponse = BaseAPIResponse<ExtractedCOGData>;
export type ExtractedCOGData = z.infer<typeof extractedCOGDataSchema>;

const extractedCOGDataSchema = z.object({
  body: z.string(),
  footer: z.string(),
  header: z.string(),
});

export default extractedCOGDataSchema;
