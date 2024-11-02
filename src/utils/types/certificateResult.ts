import type { Certificate } from '@/lib/enums/certificate';
import type { Specialization } from '@/lib/enums/specialization';

export type CertificateResult = {
  certificateList: Certificate[];
  specialization: Specialization;
};
