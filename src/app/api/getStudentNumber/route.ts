import type { Specialization } from '@/lib/enums/specialization';
import type { StudentType } from '@/lib/enums/studentType';
import type { UserRole } from '@/lib/enums/userRole';
import type { GetStudentNumberResponse } from '@/server/lib/schema/apiResponse/getStudentNumber';

import { clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import url from 'url';

type UserMetadata = {
  role: UserRole;
  studentNumber: string;
  studentType: StudentType;
  specialization: Specialization;
};

export async function GET(request: NextRequest) {
  try {
    const messageToAdmins = 'Hello Admins!';
    const clerk = await clerkClient();
    const userId = url.parse(request.url, true).query.userId as string;
    let response: GetStudentNumberResponse = {
      data: [],
      errorMessage: [],
    };

    // Many students.
    if (userId === undefined) {
      const users = await clerk.users.getUserList();
      const studentNumbers: string[] = users.data
        .map((user) => {
          const userMetadata = user.publicMetadata as UserMetadata;
          if (userMetadata['role'] === 'student') {
            return userMetadata['studentNumber'];
          }
        })
        .filter((u) => u !== undefined);

      response = {
        ...response,
        data: studentNumbers,
      };
      return NextResponse.json(response);
    }

    const user = await clerk.users.getUser(userId);
    const userMetadata = user.publicMetadata as UserMetadata;
    const role = userMetadata['role'];
    const studentNumber = userMetadata['studentNumber'];
    const studentType = userMetadata['studentType'];
    const specialization = userMetadata['specialization'];

    // One student.
    if (role === 'student') {
      response = {
        ...response,
        data: [role, specialization, studentNumber, studentType],
      };
      return NextResponse.json(response);
    }

    // For admins.
    response = {
      ...response,
      data: [messageToAdmins],
    };

    return NextResponse.json(response);
  } catch (e) {
    const error = e as Error;
    const errorResponse: GetStudentNumberResponse = {
      data: [],
      errorMessage: [error.message],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
