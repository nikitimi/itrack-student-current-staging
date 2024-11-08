import { z } from 'zod';

export type Certificate = z.infer<typeof certificateEnum>;

const certificateEnum = z.enum([
  'PROGRAMMING_AND_DEVELOPMENT',
  'NETWORKING_AND_CYBERSECURITY',
  'CLOUD_COMPUTING_AND_VIRTUALIZATION',
  'DATA_SCIENCE,_AI,_AND_MACHINE_LEARNING',
  'DATABASE_MANAGEMENT_AND_DATA_WAREHOUSING',
  'IT_SUPPORT_AND_SYSTEMS_ADMINISTRATION',
  'SOFTWARE_TESTING_AND_QUALITY_ASSURANCE',
  'PROJECT_MANAGEMENT',
  'UI/UX_DESIGN',
  'EMERGING_TECHNOLOGIES',
]);

export default certificateEnum;
