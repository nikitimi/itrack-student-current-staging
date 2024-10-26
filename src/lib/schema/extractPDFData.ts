import { z } from 'zod';

export type ExtractPDFData = z.infer<typeof extractPDFDataSchema>;

const extractPDFDataSchema = z.object({
  body: z.string(),
  footer: z.string(),
  header: z.string(),
});

export default extractPDFDataSchema;
