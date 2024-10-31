import { z } from 'zod';

export type APIRoutes = z.infer<typeof apiRoutesEnum>;

const apiRoutesEnum = z.enum([
  '/api/addUserType',
  '/api/extractExcelData',
  '/api/extractPDFData',
  '/api/getStudentNumber',
  '/api/mongo/grades',
  '/api/mongo/internship',
  '/api/mongo/certificate',
  '/api/webhooks',
  '/api/webhooks/session',
]);

export default apiRoutesEnum;
