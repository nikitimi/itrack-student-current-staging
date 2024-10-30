import type { Specialization } from '@/lib/enums/specialization';
import type { UserRole } from '@/lib/enums/userRole';

export type StudentCreation = {
  role: UserRole;
  userId: string;
  studentNumber: string;
  specialization: Specialization;
};

export default StudentCreation;
