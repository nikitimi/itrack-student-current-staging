import { z } from 'zod';

export type ServiceManagementProgramJob = z.infer<
  typeof serviceManagementProgramJobEnum
>;

const serviceManagementProgramJobEnum = z.enum([
  'TECHNICAL_SUPPORT_SPECIALIST',
  'HELP_DESK_SUPPORT_MANAGER',
  'SYSTEMS_SECURITY_MANAGER',
  'ERP_INTEGRATION_MANAGER',
  'CLOUD_SERVICE_DELIVERY_MANAGER',
]);

export default serviceManagementProgramJobEnum;
