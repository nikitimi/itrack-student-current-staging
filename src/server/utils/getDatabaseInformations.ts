'server only';

import type { MongoExtra } from '@/lib/schema/mongoExtra';
import type GradeInfo from '@/utils/types/gradeInfo';

import { headers } from 'next/headers';

import { HEADER_KEY } from '@/utils/constants';
import { BaseAPIResponse } from '../lib/schema/apiResponse';

async function getDatabaseInformations(studentNumber: string) {
  try {
    const headerList = headers();
    const origin = headerList.get(HEADER_KEY.origin) as string;

    const url = new URL(
      '/api/mongo/grades?' + new URLSearchParams({ studentNumber }),
      origin
    );

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
