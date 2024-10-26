import type { BaseAPIResponse } from '@/server/lib/schema/apiResponse';

import { z } from 'zod';

export type GetStudentNumberResponse = BaseAPIResponse<GetStudentNumber>;
export type GetStudentNumber = z.infer<typeof getStudentNumberType>;

const getStudentNumberType = z.array(z.string());

export default getStudentNumberType;
