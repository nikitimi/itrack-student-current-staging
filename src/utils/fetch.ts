'use client';

import type { MongoExtra } from '@/lib/schema/mongoExtra';
import type { APIRoutes } from '@/server/lib/enum/apiRoutes';
import type { APIMethods } from '@/server/lib/enum/apiMethods';

export default async function fetchHelper<
  T extends Partial<Pick<MongoExtra, 'studentNumber'>>,
>(uri: APIRoutes, method: APIMethods, body: T) {
  const { studentNumber } = body;
  const origin = new URL(window.location.href).origin;

  const baseURL = new URL(uri, origin);
  const fetchOptions = {
    method,
  };

  let newURL = baseURL;

  if (studentNumber !== undefined) {
    const searchParams = new URLSearchParams({ studentNumber });
    newURL = new URL(`?${searchParams}`, baseURL);
  }

  switch (method) {
    case 'GET':
      return await fetch(newURL, fetchOptions);

    case 'POST':
      return await fetch(baseURL, {
        ...fetchOptions,
        body: JSON.stringify(body),
      });
  }
}
