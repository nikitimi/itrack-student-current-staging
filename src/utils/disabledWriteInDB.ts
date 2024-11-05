import type { PromptType } from '@/lib/enums/promptType';

const disabledWriteInDB: PromptType[] = ['submitted', 'fetched from server'];

export default disabledWriteInDB;
