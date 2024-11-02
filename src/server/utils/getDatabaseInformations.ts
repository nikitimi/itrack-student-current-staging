'server only';

import type { MongoExtra } from '@/lib/schema/mongoExtra';
import type GradeInfo from '@/utils/types/gradeInfo';

import { BaseAPIResponse } from '../lib/schema/apiResponse';
import { Certificate } from '@/lib/enums/certificate';
import fetchHelper from '@/server/utils/fetch';
import { APIRoutes } from '../lib/enum/apiRoutes';

type ResponseInArray = ((GradeInfo | Certificate) & MongoExtra)[];
type GetDatabaseInformation = {
  grades: (GradeInfo & MongoExtra)[];
  certificate: Certificate[];
};

async function getDatabaseInformations(studentNumber: string) {
  let grades: GetDatabaseInformation['grades'] = [];
  let certificate: GetDatabaseInformation['certificate'] = [];

  try {
    const apiRoutes: APIRoutes[] = [
      '/api/mongo/grades',
      '/api/mongo/certificate',
      // '/api/mongo/internship'
    ] as const;

    for (const api of apiRoutes) {
      const response = await fetchHelper(api, 'GET', {
        studentNumber,
      });
      const { data, errorMessage } =
        (await response.json()) as BaseAPIResponse<ResponseInArray>;

      if (errorMessage.length > 0) throw new Error(errorMessage[0]);

      switch (true) {
        case api.includes('certificate'):
          certificate = Object.entries(data[0])
            .filter(([key]) => !isNaN(parseInt(key, 10)))
            .map(([, v]) => v as Certificate);
          break;
        case api.includes('grades'):
          grades = data as GetDatabaseInformation['grades'];
          break;
        case api.includes('internship'):
          break;
      }
    }

    return {
      grades,
      certificate,
    };
  } catch (e) {
    const error = e as Error;
    console.log({ 'Catched Error': error.message });
    return { certificate, grades };
  }
}
export default getDatabaseInformations;
