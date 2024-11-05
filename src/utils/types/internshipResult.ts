import type { InternshipTask } from '@/lib/enums/internshipTask';

export type InternshipResult = {
  tasks: InternshipTask[];
  isITCompany: boolean;
  grade: string;
  status: 'completed' | 'reconfigure' | 'under review';
};
