import { z } from 'zod';

export type WebAndMobileDevelopmentJob = z.infer<
  typeof webAndMobileDevelopmentJobEnum
>;

const webAndMobileDevelopmentJobEnum = z.enum([
  'WEB_AND_APPLICATIONS_DEVELOPER',
  'COMPUTER_PROGRAMMER',
  'WEB_ADMINISTRATOR',
  'DEVELOPMENT_OPERATIONS_ENGINEER',
  'SOFTWARE_ENGINEER',
]);

export default webAndMobileDevelopmentJobEnum;
