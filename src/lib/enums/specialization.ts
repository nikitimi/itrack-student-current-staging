import { z } from 'zod';

export type Specialization = z.infer<typeof specializationEnum>;

const specializationEnum = z.enum([
  'BUSINESS_ANALYTICS',
  'WEB_AND_MOBILE_DEVELOPMENT',
  'SERVICE_MANAGEMENT_PROGRAM',
]);

export default specializationEnum;
