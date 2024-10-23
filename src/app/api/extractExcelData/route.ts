'server only';

import { EMPTY_STRING } from '@/utils/constants';
import mime from '@/utils/mime';
import type { ApiResponse } from '@/utils/types/apiResponse';
import fs from 'node:fs';
import path from 'path';
import type { Row } from 'read-excel-file';
import readXlsxFile from 'read-excel-file/node';

type FinalResponse = ApiResponse<string>;
type SchemaHelperProps = {
  gradeRating: string;
  job: string;
  specialization: string;
  subjectCode: string;
};

function formatCells(array: Row) {
  return array.map((value) =>
    value === null
      ? null
      : value.toLocaleString().replace(/ /g, '_').toLocaleUpperCase()
  );
}
function schemaHelper({
  gradeRating,
  job,
  specialization,
  subjectCode,
}: SchemaHelperProps) {
  const schema = {
    // academicYear: {
    //   gradeLevel: "FIRST_YEAR",
    //   semester: "SECOND_SEMESTER",
    // },
    job,
    specialization,
    subjectCode,
    gradeRating,
  };
  return schema;
}
function saveToFile(fileName: string, data: string) {
  const filePath = path.join(
    process.cwd(),
    '/src/data/extraction/result/excel'
  );
  const fileFullPath = path.resolve(filePath, fileName);

  if (!fs.existsSync(filePath)) {
    fs.mkdir(filePath, (err) => console.log(err?.message));
    fs.createWriteStream(fileFullPath, { encoding: 'utf-8' });
  }
  fs.appendFile(fileFullPath, data, (err) => {
    if (err === null) return err;
    throw new Error(err.message);
  });
}
async function excelReader(buffer: Buffer) {
  try {
    const [category, jobs, ...rows] = await readXlsxFile(buffer);
    const filteredCategory = formatCells(category).filter((v) => v !== null);
    const filteredJobs = formatCells(jobs).filter((v) => v !== null);
    const rowCollection: SchemaHelperProps[] = [];

    rows.forEach((cell) => {
      const [subjectCode, ...row] = cell;
      row.forEach((r, index) => {
        switch (index) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
            return rowCollection.push(
              schemaHelper({
                specialization: filteredCategory[0],
                job: filteredJobs[index],
                subjectCode: subjectCode
                  .toString()
                  .replace(/ /g, '_')
                  .toLocaleUpperCase(),
                gradeRating: r.toString().toLocaleUpperCase(),
              })
            );
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
            return rowCollection.push(
              schemaHelper({
                specialization: filteredCategory[1],
                job: filteredJobs[index],
                subjectCode: subjectCode
                  .toString()
                  .replace(/ /g, '_')
                  .toLocaleUpperCase(),
                gradeRating: r.toString().toLocaleUpperCase(),
              })
            );
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
            return rowCollection.push(
              schemaHelper({
                specialization: filteredCategory[2],
                job: filteredJobs[index],
                subjectCode: subjectCode
                  .toString()
                  .replace(/ /g, '_')
                  .toLocaleUpperCase(),
                gradeRating: r.toString().toLocaleUpperCase(),
              })
            );
        }
      });
    });
    saveToFile('result.json', `{"data":${JSON.stringify(rowCollection)}}`);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request: Request) {
  let data: FinalResponse = { data: EMPTY_STRING, errorMessage: [] };
  const formdata = await request.formData();
  const entries = formdata.entries();

  for (const [key, document] of entries) {
    if (key !== 'file') {
      return Response.json(
        { data: '', errorMessage: ['No file provided.'] } as FinalResponse,
        { status: 411 }
      );
    }

    const file = document as File;

    switch (file.type) {
      case mime.excel:
        excelReader(Buffer.from(await file.arrayBuffer()));
        data = {
          data: 'Extraction of excel file is a success!',
          errorMessage: [],
        };
        break;
      // case mime.pdf:
      //   return (data = {});
      default:
        return Response.json(
          {
            data: EMPTY_STRING,
            errorMessage: [
              'Unsupported file type! Please select a valid excel file',
              `MIME Type: ${mime.excel}`,
            ],
          } as FinalResponse,
          { status: 400 }
        );
    }
  }

  return Response.json(data);
}
