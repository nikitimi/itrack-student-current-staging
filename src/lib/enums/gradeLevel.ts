import { z } from "zod";

const gradeLevelEnum = z.enum([
  "FIRST_YEAR",
  "SECOND_YEAR",
  "THIRD_YEAR",
  "FOURTH_YEAR",
]);

export type GradeLevel = z.infer<typeof gradeLevelEnum>;
export default gradeLevelEnum;
