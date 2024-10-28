import type { InternshipTask } from '@/lib/enums/internshipTask';

export type InternshipResult = {
  tasks: InternshipTask[];
  isITCompany: boolean;
  grade: number;
  status: 'completed' | 'reconfigure' | 'under review';
};
