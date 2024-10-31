import type { InternshipResult } from '@/utils/types/internshipResult';

import { NextRequest, NextResponse } from 'next/server';
import url from 'url';

import { MongoExtra } from '@/lib/schema/mongoExtra';
import { collection } from '@/server/utils/mongodb';
import { BaseAPIResponse } from '@/server/lib/schema/apiResponse';
import { EMPTY_STRING, WRONG_NUMBER } from '@/utils/constants';

const internshipCollection = collection('Internship');

export async function POST(request: NextRequest) {
  const response: BaseAPIResponse<string> = {
    data: EMPTY_STRING,
    errorMessage: [],
  };
  try {
    const internship = (await request.json()) as InternshipResult &
      Pick<MongoExtra, 'studentNumber'>;
    const date = new Date();
    const gradeInsertion = await internshipCollection.insertOne({
      ...internship,
      dateCreated: date.getTime(),
      dateModified: WRONG_NUMBER,
    });

    return NextResponse.json({
      ...response,
      data: `${gradeInsertion.acknowledged}\n${gradeInsertion.insertedId}`,
    });
  } catch (e) {
    const error = e as Error;
    return NextResponse.json(
      { ...response, errorMessage: [error.message] },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  const response: BaseAPIResponse<InternshipResult & MongoExtra> = {
    data: {
      _id: EMPTY_STRING,
      tasks: [],
      isITCompany: false,
      grade: 0,
      studentNumber: EMPTY_STRING,
      status: 'reconfigure',
      dateCreated: WRONG_NUMBER,
      dateModified: WRONG_NUMBER,
    },
    errorMessage: [],
  };
  try {
    const studentNumber = url.parse(request.url, true).query
      .studentNumber as string;
    if (studentNumber === undefined) {
      throw new Error('No student number given.');
    }

    const internship = await internshipCollection.findOne({ studentNumber });

    if (internship === null)
      throw new Error(
        `Internship document under the student number: ${studentNumber} not found`
      );

    return NextResponse.json({
      ...response,
      data: internship,
    });
  } catch (e) {
    const error = e as Error;
    return NextResponse.json(
      { ...response, errorMessage: [error.message] },
      { status: 400 }
    );
  }
}
