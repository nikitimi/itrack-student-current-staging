import { z } from 'zod';

export type BaseAPIResponse<T> = {
  data: T;
} & Omit<z.infer<typeof baseAPIResponseSchema>, 'data'>;

const baseAPIResponseSchema = z.object({
  data: z.any(),
  errorMessage: z.array(z.string()),
});

export default baseAPIResponseSchema;
