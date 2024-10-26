import type { BaseAPIResponse } from '@/server/lib/schema/apiResponse';

import { z } from 'zod';

export type ExtractExcelDataResponse = BaseAPIResponse<ExtractExcelData>;
export type ExtractExcelData = z.infer<typeof extractExcelDataType>;

const extractExcelDataType = z.string();

export default extractExcelDataType;
