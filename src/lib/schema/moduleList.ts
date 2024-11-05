/** For Input Controller */

import { z } from 'zod';
import promptTypeEnum from '../enums/prompType';

export type ModuleList = z.infer<typeof moduleListSchema>;

const moduleListSchema = z.object({
  certificateModule: promptTypeEnum,
  gradeModule: promptTypeEnum,
  internshipModule: promptTypeEnum,
});

export default moduleListSchema;
