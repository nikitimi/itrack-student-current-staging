import { z } from "zod";

const gradeRatingEnum = z.enum(["A", "B", "C"]);

export type GradeRating = z.infer<typeof gradeRatingEnum>;
export default gradeRatingEnum;
