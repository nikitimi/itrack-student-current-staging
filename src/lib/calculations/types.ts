import type { Specialization } from "@/lib/enums/specialization";
import type { BusinessAnalyticJob } from "@/lib/enums/jobs/businessAnalytics";
import type { WebAndMobileDevelopmentJob } from "@/lib/enums/jobs/webAndMobileDevelopment";
import type { ServiceManagementProgramJob } from "@/lib/enums/jobs/serviceManagementProgram";
import type { Curriculum } from "@/lib/enums/curriculum";
import type { SubjectCodesFor2018CurriculumEnum } from "@/lib/enums/subjectCodesFor2018Curriculum";
import type { GradeRating } from "@/lib/enums/gradeRating";
import type { Certificate } from "@/lib/enums/certificate";
import type { InternshipTask } from "@/lib/enums/internshipTask";
import type { AcademicYear } from "../schema/academicYear";

type ModifiedAcademicYear = Pick<AcademicYear, "semester"> &
  Partial<Pick<AcademicYear, "gradeLevel">>;

export type GeneralCalculation = {
  job:
    | BusinessAnalyticJob
    | WebAndMobileDevelopmentJob
    | ServiceManagementProgramJob;
  specialization: Specialization;
  gradeRating: GradeRating;
};

/** More strict type inference. */
// type GradesCalculation<S extends Specialization, C extends Curriculum> = {
//   academicYear: AcademicYear;
//      job: S extends "BUSINESS_ANALYTICS"
//        ? BusinessAnalytics
//        : S extends "WEB_AND_MOBILE_DEVELOPMENT"
//        ? WebAndMobileDevelopment
//        : ServiceManagementProgram;
//   gradeRating: GradeRating;
//   specialization: S;
//   subjectCode: C extends "2018 Curriculum"
//     ? SubjectCodes2018Curriculum
//     : Map<string, string>;
// };

export type CertificatesCalculation = {
  certificate: Certificate;
} & GeneralCalculation;

export type GradesCalculation<C extends Curriculum> = {
  academicYear: ModifiedAcademicYear;
  subjectCode: C extends "2018 Curriculum"
    ? SubjectCodesFor2018CurriculumEnum
    : Map<string, string>;
} & GeneralCalculation;

export type InternshipCalculation = {
  task: InternshipTask;
  gradeRating: 1 | 2 | 3 | 4 | 5;
} & Omit<GeneralCalculation, "gradeRating">;
