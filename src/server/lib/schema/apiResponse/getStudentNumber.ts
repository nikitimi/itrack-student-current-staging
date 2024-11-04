import specializationEnum from '@/lib/enums/specialization';
import studentTypeEnum from '@/lib/enums/studentType';
import userRoleEnum from '@/lib/enums/userRole';
import type { BaseAPIResponse } from '@/server/lib/schema/apiResponse';

import { z } from 'zod';

export type GetStudentNumberResponse = BaseAPIResponse<
  (GetStudentNumber | string)[]
>;
export type GetStudentNumber = z.infer<typeof getStudentNumberType>;

const getStudentNumberType = z.object({
  role: userRoleEnum,
  studentNumber: z.string(),
  studentType: studentTypeEnum,
  specialization: specializationEnum,
  firstName: z.string(),
  lastName: z.string(),
});

export default getStudentNumberType;
