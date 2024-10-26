import type { BaseAPIResponse } from '@/server/lib/schema/apiResponse';
import type { UserSession } from '@/lib/schema/userSession';

export type SessionCreatedResponse = BaseAPIResponse<UserSession>;
