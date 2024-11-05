import type { PromptType } from '@/lib/enums/prompType';

const disabledPromptList: PromptType[] = [
  'fetched from server',
  'fetching',
  'submitted',
  'showing prompt',
];

export default disabledPromptList;
