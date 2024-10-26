'server only';

import type { ExcelRowHelperParams } from '@/server/lib/schema/excelRowHelper';

import readXlsxFile from 'read-excel-file/node';

import excelRowHelper from '@/server/utils/excel/excelRowHelper';
import formatCells from '@/server/utils/excel/formatCells';
import saveToFile from '@/server/utils/excel/saveToFile';

export default async function excelReader(buffer: Buffer) {
  try {
    const [specializations, jobs, ...rows] = await readXlsxFile(buffer);
    const filteredSpecialization = formatCells(specializations).filter(
      (v) => v !== null
    );
    const filteredJobs = formatCells(jobs).filter((v) => v !== null);
    const rowCollection: ExcelRowHelperParams[] = [];

    rows.forEach((cell) => {
      const [subjectCode, ...row] = cell;
      row.forEach((r, index) => {
        // The division of cases are based on the excel file provided with 5 division each specializations.
        switch (index) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
            return rowCollection.push(
              excelRowHelper({
                specialization: filteredSpecialization[0],
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
              excelRowHelper({
                specialization: filteredSpecialization[1],
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
              excelRowHelper({
                specialization: filteredSpecialization[2],
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
