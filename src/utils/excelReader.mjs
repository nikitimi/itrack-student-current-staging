import fs from "fs";
import path from "path";
import readXlsxFile from "read-excel-file/node";

function formatCells(array) {
  return array.map((value) =>
    value === null
      ? null
      : value.toLocaleString().replace(/ /g, "_").toLocaleUpperCase()
  );
}

function schemaHelper({ gradeRating, job, specialization, subjectCode }) {
  const filePath = path.join("path/to/directory", "/filename.extension");
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
  fs.appendFileSync(filePath, `${JSON.stringify(schema)},`);
}

async function excelReader() {
  try {
    const [category, jobs, ...rows] = await readXlsxFile(
      fs.readFileSync("path/to/file")
    );
    const filteredCategory = formatCells(category).filter((v) => v !== null);
    const filteredJobs = formatCells(jobs).filter((v) => v !== null);

    rows.forEach((cell) => {
      const [subjectCode, ...row] = cell;
      row.forEach((r, index) => {
        switch (index) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
            return schemaHelper({
              specialization: filteredCategory[0],
              job: filteredJobs[index],
              subjectCode: subjectCode
                .toString()
                .replace(/ /g, "_")
                .toLocaleUpperCase(),
              gradeRating: r.toString().toLocaleUpperCase(),
            });
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
            return schemaHelper({
              specialization: filteredCategory[1],
              job: filteredJobs[index],
              subjectCode: subjectCode
                .toString()
                .replace(/ /g, "_")
                .toLocaleUpperCase(),
              gradeRating: r.toString().toLocaleUpperCase(),
            });
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
            return schemaHelper({
              specialization: filteredCategory[2],
              job: filteredJobs[index],
              subjectCode: subjectCode
                .toString()
                .replace(/ /g, "_")
                .toLocaleUpperCase(),
              gradeRating: r.toString().toLocaleUpperCase(),
            });
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
}

excelReader();
