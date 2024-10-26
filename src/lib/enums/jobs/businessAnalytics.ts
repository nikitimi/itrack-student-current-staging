import { z } from 'zod';

export type BusinessAnalyticJob = z.infer<typeof businessAnalyticJobEnum>;

const businessAnalyticJobEnum = z.enum([
  'DATA_ENGINEER',
  'DATABASE_DEVELOPER',
  'DATA_ANALYST',
  'BUSINESS_ANALYST',
  'SYSTEMS_ANALYST',
]);

export default businessAnalyticJobEnum;
