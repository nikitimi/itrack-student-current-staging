import { z } from 'zod';

export type MongoExtra = z.infer<typeof mongoExtraSchema>;

const mongoExtraSchema = z.object({
  _id: z.string(),
  studentNumber: z.string(),
  dateCreated: z.number(),
  dateModified: z.number(),
});

export default mongoExtraSchema;
