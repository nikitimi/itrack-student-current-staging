import type { AddUserTypeResponse } from '@/server/lib/schema/apiResponse/addUserType';

import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import getStudentType from '@/utils/getStudentType';

export async function POST(request: Request) {
  const { role, specialization, studentNumber, userId } = await request.json();
  const clerk = await clerkClient();
  const studentType = getStudentType(studentNumber as string);
  let response: AddUserTypeResponse = {
    data: '',
    errorMessage: [],
  };

  const user = await clerk.users.updateUserMetadata(userId, {
    publicMetadata: {
      role,
      specialization,
      studentNumber,
      studentType,
    },
  });

  const publicMetadata = user.publicMetadata as Record<
    'role',
    string | undefined
  >;
  const roleMetadata = publicMetadata['role'];

  if (roleMetadata === undefined) {
    response = {
      ...response,
      errorMessage: ['Role is not set in the public metadata of the user.'],
    };

    return NextResponse.json(response, { status: 500 });
  }

  response = {
    ...response,
    data: `Successfully added role to ${userId}`,
  };

  return NextResponse.json(response);
}
