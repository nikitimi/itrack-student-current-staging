import type { BaseAPIResponse } from '@/server/lib/schema/apiResponse';

import { z } from 'zod';

export type WebHookResponse = BaseAPIResponse<WebHook>;
export type WebHook = z.infer<typeof webhookType>;

const webhookType = z.string();

export default webhookType;
