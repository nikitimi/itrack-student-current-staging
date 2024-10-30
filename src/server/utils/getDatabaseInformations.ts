'server only';

import type { MongoExtra } from '@/lib/schema/mongoExtra';
import type GradeInfo from '@/utils/types/gradeInfo';

import { headers } from 'next/headers';

import { HEADER_KEY } from '@/utils/constants';
import { BaseAPIResponse } from '../lib/schema/apiResponse';
import { Certificate } from '@/lib/enums/certificate';
import regExp from '@/utils/regex';

type GetDatabaseInformation = {
  grades: (GradeInfo & MongoExtra)[];
  certificate: Certificate[];
};

function getUrl(uri: string, studentNumber: string, origin: string) {
  if (!regExp.studentNumber.test(studentNumber)) return new URL('', origin);
  return new URL(`${uri}?${new URLSearchParams({ studentNumber })}`, origin);
}

async function getDatabaseInformations(
  studentNumber: string
): Promise<GetDatabaseInformation> {
  try {
    const headerList = headers();
    const origin = headerList.get(HEADER_KEY.origin) as string;

    const getGrades = await fetch(
      getUrl('/api/mongo/grades', studentNumber, origin),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    //Check if there is a existing data in the database.
    const getCertificate = await fetch(
      getUrl('/api/mongo/certificate', studentNumber, origin),
      {
        method: 'GET',
      }
    );
    const certificateBody = (await getCertificate.json()) as BaseAPIResponse<
      (Certificate & MongoExtra)[]
    >;
    const certificates = Object.entries(certificateBody.data[0])
      .filter(([key]) => !isNaN(parseInt(key, 10)))
      .map(([, v]) => v);

    const gradeBody = (await getGrades.json()) as BaseAPIResponse<
      (GradeInfo & MongoExtra)[]
    >;
    return {
      grades: gradeBody.data,
      certificate: certificates as GetDatabaseInformation['certificate'],
    };
  } catch (e) {
    const error = e as Error;
    console.log(error.message);
    return { certificate: [], grades: [] };
  }
}
export default getDatabaseInformations;
