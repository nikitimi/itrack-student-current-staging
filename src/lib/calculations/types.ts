import { z } from "zod";
import specialization from "@/lib/enums/specialization";
import businessAnalytics from "@/lib/enums/jobs/businessAnalytics";
import webAndMobileDevelopment from "@/lib/enums/jobs/webAndMobileDevelopment";
import serviceManagementProgram from "@/lib/enums/jobs/serviceManagementProgram";
import academicYear from "@/lib/schema/academicYear";
import curriculums from "@/lib/enums/curriculums";
import subjectCodesFor2018Curriculum from "@/lib/enums/subjectCodesFor2018Curriculum";
import gradeRating from "@/lib/enums/gradeRating";
import certificates from "@/lib/enums/certificates";
import internshipTasks from "../enums/internshipTasks";

type AcademicYear = z.infer<typeof academicYear>;
type BusinessAnalytics = z.infer<typeof businessAnalytics>;
type Certificates = z.infer<typeof certificates>;
type Curriculum = z.infer<typeof curriculums>;
type GradeRating = z.infer<typeof gradeRating>;
type ServiceManagementProgram = z.infer<typeof serviceManagementProgram>;
type Specialization = z.infer<typeof specialization>;
type SubjectCodes2018Curriculum = z.infer<typeof subjectCodesFor2018Curriculum>;
type InternshipTasks = z.infer<typeof internshipTasks>;
type WebAndMobileDevelopment = z.infer<typeof webAndMobileDevelopment>;

export type GeneralCalculation = {
  job: BusinessAnalytics | WebAndMobileDevelopment | ServiceManagementProgram;
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
  certificate: Certificates;
} & GeneralCalculation;

export type GradesCalculation<C extends Curriculum> = {
  academicYear: AcademicYear;
  subjectCode: C extends "2018 Curriculum"
    ? SubjectCodes2018Curriculum
    : Map<string, string>;
} & GeneralCalculation;

export type InternshipCalculation = {
  task: InternshipTasks;
  gradeRating: 1 | 2 | 3 | 4 | 5;
} & Omit<GeneralCalculation, "gradeRating">;
