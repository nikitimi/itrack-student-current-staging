import { z } from "zod";

const specializationEnum = z.enum([
  "BUSINESS_ANALYTICS",
  "WEB_AND_MOBILE_DEVELOPMENT",
  "SERVICE_MANAGEMENT_PROGRAM",
]);

export type Specialization = z.infer<typeof specializationEnum>;
export default specializationEnum;
