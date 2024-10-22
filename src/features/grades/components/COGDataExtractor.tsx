"use client";

import {
  firstYearSubjects,
  fourthYearSubjects,
  secondYearSubjects,
  thirdYearSubjects,
} from "@/lib/calculations/grades";
import type gradeLevel from "@/lib/enums/gradeLevel";
import type semester from "@/lib/enums/semester";
import type specialization from "@/lib/enums/specialization";
import { useRef } from "react";
import pdfToText from "react-pdftotext";
import { z } from "zod";

type YearLevel = z.infer<typeof gradeLevel>;
type Semester = z.infer<typeof semester>;
type SubjectDetails =
  | (typeof firstYearSubjects)[number]
  | (typeof secondYearSubjects)[number]
  | (typeof thirdYearSubjects)[number]
  | (typeof fourthYearSubjects)[number];
type SubjectsHelperProps = {
  checkedSemester: Semester;
  targetSpecialization: z.infer<typeof specialization>;
  textHolder: string;
  subjects: SubjectDetails[];
};
type RegExpModificationResult = {
  name: string;
  data: string | string[];
};
type FinalResult = {
  studentNumber: string;
  academicYear: string;
  semester: Semester;
  yearLevel: YearLevel;
  subjects: { code: SubjectDetails["subjectCode"]; grade: string }[];
};

const subjectList: {
  subjectCode: SubjectDetails["subjectCode"];
  index: number;
}[] = [];

function subjectsHelper(props: SubjectsHelperProps) {
  const subjects = props.subjects.filter(
    ({ academicYear, specialization }) =>
      academicYear.semester === props.checkedSemester &&
      specialization === props.targetSpecialization
  );
  const filteredSubjectSource = Array.from(
    new Set(subjects.map(({ subjectCode }) => subjectCode))
  );
  filteredSubjectSource.forEach((subjectCode) => {
    const formattedSubjectCode = subjectCode.replace(/_/g, " ");
    const index = props.textHolder.indexOf(formattedSubjectCode);

    if (!props.textHolder.match(formattedSubjectCode)) return;
    if (subjectList.filter((s) => subjectCode === s.subjectCode).length === 0)
      subjectList.push({ subjectCode, index });
  });

  return subjectList
    .sort((a, b) => a.index - b.index)
    .map(({ subjectCode }) => subjectCode);
}

async function extractText(files: FileList | null) {
  if (files === null) return console.log("files are null!");

  const removeWithRegExps = [
    /** Remove all trailing data. */
    new RegExp(/nothing+[\d\D]*/g), // Below the COG.
  ];
  const retrieveWithRegExps = [
    { name: "studentNumber", regExp: new RegExp(/\d{10}/) },
    { name: "academicYear", regExp: new RegExp(/\d{4}-\d{4}/) },

    /** Use the following below to match the subject code with lower scope of subject codes. */
    { name: "yearLevel", regExp: new RegExp(/(\d{1}(st|nd|rd|th))+( )+Year/g) },
    { name: "semester", regExp: new RegExp(/(\d{1}st|nd|rd|th)*( )+Semester/) },

    /** Match all the grades in the COG. */
    { name: "grades", regExp: new RegExp(/\d{1}.\d{2}/g) },
  ];

  try {
    /** TODO: Link specialization here. */
    const targetSpecialization = "BUSINESS_ANALYTICS";
    const originalText = await pdfToText(files[0]);
    let textHolder = originalText;
    const result: RegExpModificationResult[] = [];
    removeWithRegExps.forEach(
      (regExp) => (textHolder = textHolder.replace(regExp, ""))
    );
    retrieveWithRegExps.forEach(({ regExp, name }) => {
      const isNameForNumbers =
        name === "academicYear" || name === "studentNumber";

      if (isNameForNumbers) {
        result.push({
          name,
          data: textHolder.match(regExp)?.[0] as string,
        });
        return (textHolder = textHolder.replace(regExp, ""));
      }
      result.push({
        name,
        data: textHolder.match(regExp) as string[],
      });
    });

    /** Preparing arguments. */
    const yearLevel = result.filter(({ name }) => name === "yearLevel")[0];
    const semester = result.filter(({ name }) => name === "semester")[0];
    let checkedYearLevel: YearLevel = "FIRST_YEAR";
    const checkedSemester = (semester.data[0] as string)
      .split(" ")[0]
      .includes("st")
      ? "FIRST_SEMESTER"
      : "SECOND_SEMESTER";

    let subjectHelperArguments: SubjectsHelperProps = {
      checkedSemester,
      targetSpecialization,
      textHolder,
      subjects: [],
    };

    console.log({ yearLevel });
    switch (true) {
      case (yearLevel.data[0] as string).includes("1st"):
        subjectHelperArguments = {
          ...subjectHelperArguments,
          subjects: firstYearSubjects,
        };
        break;
      case (yearLevel.data[0] as string).includes("2nd"):
        subjectHelperArguments = {
          ...subjectHelperArguments,
          subjects: secondYearSubjects,
        };
        checkedYearLevel = "SECOND_YEAR";
        break;
      case (yearLevel.data[0] as string).includes("3rd"):
        subjectHelperArguments = {
          ...subjectHelperArguments,
          subjects: thirdYearSubjects,
        };
        checkedYearLevel = "THIRD_YEAR";
        break;
      case (yearLevel.data[0] as string).includes("4th"):
        subjectHelperArguments = {
          ...subjectHelperArguments,
          subjects: fourthYearSubjects,
        };
        checkedYearLevel = "FOURTH_YEAR";
        break;
    }

    const finalGrades = result.filter(({ name }) => name === "grades")[0][
      "data"
    ] as string[];
    const finalSubjectCodes = subjectsHelper(subjectHelperArguments);

    const finalResult: FinalResult = {
      academicYear: result.filter(({ name }) => name === "academicYear")[0][
        "data"
      ] as string,
      studentNumber: result.filter(({ name }) => name === "studentNumber")[0][
        "data"
      ] as string,
      yearLevel: checkedYearLevel,
      semester: checkedSemester,
      subjects: [],
    };

    finalGrades.forEach((grade, i) => {
      finalResult.subjects.push({ grade, code: finalSubjectCodes[i] });
    });

    console.log({
      finalResult,
    });
  } catch (error) {
    console.error("Failed to extract text from pdf", error);
  }
}

const COGDataExtractor = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input ref={inputRef} type="file" />
      <button
        onClick={() => {
          const input = inputRef.current;
          if (input === null) return;

          extractText(inputRef.current?.files ?? null);
        }}
      >
        Reveal
      </button>
    </>
  );
};

export default COGDataExtractor;
