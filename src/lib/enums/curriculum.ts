import { z } from "zod";

const curriculumEnum = z.enum(["2018 Curriculum"]);

export type Curriculum = z.infer<typeof curriculumEnum>;
export default curriculumEnum;
