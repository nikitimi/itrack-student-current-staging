import { z } from 'zod';

const extractedCOGDataSchema = z.object({
  body: z.string(),
  footer: z.string(),
  header: z.string(),
});

export type ExtractedCOGData = z.infer<typeof extractedCOGDataSchema>;
export default extractedCOGDataSchema;
