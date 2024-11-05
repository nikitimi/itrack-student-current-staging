import type { PromptType } from '@/lib/enums/prompType';

const disabledWriteInDB: PromptType[] = ['submitted', 'fetched from server'];

export default disabledWriteInDB;
