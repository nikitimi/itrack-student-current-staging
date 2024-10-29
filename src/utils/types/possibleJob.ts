import type { BusinessAnalyticJob } from '@/lib/enums/jobs/businessAnalytics';
import type { ServiceManagementProgramJob } from '@/lib/enums/jobs/serviceManagementProgram';
import type { WebAndMobileDevelopmentJob } from '@/lib/enums/jobs/webAndMobileDevelopment';

type PossibleJob =
  | BusinessAnalyticJob
  | WebAndMobileDevelopmentJob
  | ServiceManagementProgramJob;

export default PossibleJob;
