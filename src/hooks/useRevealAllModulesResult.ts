'use client';

import { useAppSelector } from '@/hooks/redux';
import { certificateList } from '@/redux/reducers/certificateReducer';
//eslint-disable-next-line boundaries/element-types
import certificateResult from '@/features/certificate/student/utils/certificateResult';
import { studentInfoSpecialization } from '@/redux/reducers/studentInfoReducer';
import { grades } from '@/redux/reducers/gradeReducer';
//eslint-disable-next-line boundaries/element-types
import gradeResult from '@/features/grade/student/utils/gradeResult';
//eslint-disable-next-line boundaries/element-types
import internshipResult from '@/features/internship/utils/internshipResult';
import PossibleJob from '@/utils/types/possibleJob';

const useRevealAllModulesResult = () => {
  const specialization = studentInfoSpecialization(
    useAppSelector((s) => s.studentInfo)
  );
  const _certificateList = certificateList(
    useAppSelector((s) => s.certificate)
  );
  const _grades = grades(useAppSelector((s) => s.grade));
  const { internshipGrade, internshipTasks, internshipCompanyQuestion } =
    useAppSelector((s) => s.internship);

  const renderGradeResult = gradeResult({ grades: _grades, specialization });
  const renderCertificateResult = certificateResult({
    certificateList: _certificateList,
    specialization,
  });
  const renderInternshipResult = internshipResult({
    internshipResult: {
      grade: typeof internshipGrade === 'string' ? 0 : internshipGrade,
      tasks: internshipTasks,
      isITCompany:
        typeof internshipCompanyQuestion === 'string'
          ? false
          : internshipCompanyQuestion,
    },
    specialization,
  });

  const props = {
    certificate: Object.entries(
      renderCertificateResult as Record<string, number>
    ),
    grades: renderGradeResult,
    internship: renderInternshipResult.taskPerformedCalculations
      .sort((a, b) => b[Object.keys(b)[0]] - a[Object.keys(a)[0]])
      .map((object) => Object.entries(object)[0]),
  };

  let jobHolder: Record<PossibleJob, number> = {
    DATA_ENGINEER: 0,
    DATABASE_DEVELOPER: 0,
    DATA_ANALYST: 0,
    BUSINESS_ANALYST: 0,
    SYSTEMS_ANALYST: 0,
    WEB_AND_APPLICATIONS_DEVELOPER: 0,
    COMPUTER_PROGRAMMER: 0,
    WEB_ADMINISTRATOR: 0,
    DEVELOPMENT_OPERATIONS_ENGINEER: 0,
    SOFTWARE_ENGINEER: 0,
    TECHNICAL_SUPPORT_SPECIALIST: 0,
    HELP_DESK_SUPPORT_MANAGER: 0,
    SYSTEMS_SECURITY_MANAGER: 0,
    ERP_INTEGRATION_MANAGER: 0,
    CLOUD_SERVICE_DELIVERY_MANAGER: 0,
  };
  function calculateRecord(record: [string, number][]) {
    record
      .sort((a, b) => b[1] - a[1])
      .forEach(([job], index) => {
        jobHolder = {
          ...jobHolder,
          [job as PossibleJob]:
            jobHolder[job as PossibleJob] + (record.length - index),
        };
      });
  }

  calculateRecord(props.certificate);
  calculateRecord(props.grades ?? []);
  calculateRecord(props.internship);

  const filteredJobHolder = Object.entries(jobHolder)
    .filter(([, value]) => value !== 0)
    .sort((a, b) => b[1] - a[1])
    .reduce(
      (acc, [key, value]) => {
        acc[key as PossibleJob] = value;
        return acc;
      },
      {} as Record<PossibleJob, number>
    );
  return { ...props, jobHolder: filteredJobHolder };
};

export default useRevealAllModulesResult;
