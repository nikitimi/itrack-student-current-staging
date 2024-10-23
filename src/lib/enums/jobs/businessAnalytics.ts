import { z } from "zod";

const businessAnalyticJobEnum = z.enum([
  "DATA_ENGINEER",
  "DATABASE_DEVELOPER",
  "DATA_ANALYST",
  "BUSINESS_ANALYST",
  "SYSTEMS_ANALYST",
]);

export type BusinessAnalyticJob = z.infer<typeof businessAnalyticJobEnum>;
export default businessAnalyticJobEnum;
