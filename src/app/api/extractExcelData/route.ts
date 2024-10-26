import type { ExtractExcelDataResponse } from '@/server/lib/schema/apiResponse/extractExcelData';

import { NextResponse } from 'next/server';

import excelReader from '@/server/utils/excel/excelReader';
import { EMPTY_STRING } from '@/utils/constants';
import mime from '@/utils/mime';

export async function POST(request: Request) {
  let response: ExtractExcelDataResponse = {
    data: EMPTY_STRING,
    errorMessage: [],
  };
  const formdata = await request.formData();
  const entries = formdata.entries();

  for (const [key, document] of entries) {
    if (key !== 'file') {
      response = {
        ...response,
        errorMessage: ['No file provided.'],
      };
      return NextResponse.json(response, { status: 411 });
    }

    const file = document as File;

    switch (file.type) {
      case mime.excel:
        excelReader(Buffer.from(await file.arrayBuffer()));
        response = {
          ...response,
          data: 'Extraction of excel file is a success!',
        };
        break;
      default:
        return NextResponse.json(
          {
            ...response,
            errorMessage: [
              'Unsupported file type! Please select a valid excel file',
              `MIME Type: ${mime.excel}`,
            ],
          },
          { status: 400 }
        );
    }
  }

  return NextResponse.json(response);
}
