import { z } from "zod";

const webAndMobileDevelopmentJobEnum = z.enum([
  "WEB_AND_APPLICATIONS_DEVELOPER",
  "COMPUTER_PROGRAMMER",
  "WEB_ADMINISTRATOR",
  "DEVELOPMENT_OPERATIONS_ENGINEER",
  "SOFTWARE_ENGINEER",
]);

export type WebAndMobileDevelopmentJob = z.infer<
  typeof webAndMobileDevelopmentJobEnum
>;
export default webAndMobileDevelopmentJobEnum;
