'server only';

import type { MongoExtra } from '@/lib/schema/mongoExtra';
import type { BaseAPIResponse } from '@/server/lib/schema/apiResponse';
import type GradeInfo from '@/utils/types/gradeInfo';

import fetchHelper from '@/server/utils/fetch';

async function getDatabaseInformations(studentNumber: string) {
  try {
    const response = await fetchHelper('/api/mongo/grades', 'GET', {
      studentNumber,
    });
    const { data } = (await response.json()) as BaseAPIResponse<
      (GradeInfo & MongoExtra)[]
    >;
    return data;
  } catch (e) {
    const error = e as Error;
    console.log(error.message);
    const data = [] as (GradeInfo & MongoExtra)[];
    return data;
  }
}
export default getDatabaseInformations;
