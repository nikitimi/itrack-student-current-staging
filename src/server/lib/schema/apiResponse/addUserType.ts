import type { BaseAPIResponse } from '@/server/lib/schema/apiResponse';

import { z } from 'zod';

export type AddUserTypeResponse = BaseAPIResponse<AddUserType>;
export type AddUserType = z.infer<typeof addUserType>;

const addUserType = z.string();

export default addUserType;
