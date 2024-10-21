import { z } from "zod";
import gradeLevel from "@/lib/enums/gradeLevel";
import semester from "@/lib/enums/semester";

export default z.object({
  gradeLevel: z.union([gradeLevel, z.undefined()]),
  semester,
});
