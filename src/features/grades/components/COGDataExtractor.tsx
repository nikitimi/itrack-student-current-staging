"use client";

import {
  firstYearSubjects,
  fourthYearSubjects,
  secondYearSubjects,
  thirdYearSubjects,
} from "@/lib/calculations/grades";
import { useRef } from "react";
import pdfToText from "react-pdftotext";

async function extractText(files: FileList | null) {
  if (files === null) return console.log("files are null!");

  const removeWithRegExps = [
    /** Remove all trailing data. */
    new RegExp(
      /Bustos, Bustos, Bulacan  REPORT OF GRADES  Fullname   : Gender   : College   : Program   : Major   : Student   No   : Academic   Year   and   Term   : Year   Level   : \d{10}  \d{4}-\d{4}/
    ), // Before the grades.
    new RegExp(/nothing+[\d\D]*/g), // Below the COG.
  ];
  const retrieveWithRegExps = [
    /** Match all the grades in the COG. */
    { name: "grades", regExp: new RegExp(/\d{1}.\d{2}/g) },

    /** Use the following below to match the subject code with lower scope of subject codes. */
    { name: "yearLevel", regExp: new RegExp(/(\d{1}st|nd|rd|th)*( )+Year/) },
    { name: "semester", regExp: new RegExp(/(\d{1}st|nd|rd|th)*( )+Semester/) },
  ];

  try {
    // TODO: Link specialization here.
    const targetSpecialization = "BUSINESS_ANALYTICS";
    const originalText = await pdfToText(files[0]);
    let textHolder = originalText;
    const result: any[] = [];
    const subjectlist: string[] = [];
    removeWithRegExps.forEach(
      (regExp) => (textHolder = textHolder.replace(regExp, ""))
    );
    retrieveWithRegExps.forEach(({ regExp, name }) =>
      result.push({ name, data: textHolder.match(regExp) })
    );

    const yearLevel = result.filter(({ name }) => name === "yearLevel")[0];
    const semester = result.filter(({ name }) => name === "semester")[0];
    const checkedSemester = (semester.data[0] as string).startsWith("st")
      ? "FIRST_SEMESTER"
      : "SECOND_SEMESTER";
    if ((yearLevel.data[0] as string).includes("st")) {
      const subjects = firstYearSubjects.filter(
        ({ academicYear, specialization }) =>
          academicYear.semester === checkedSemester &&
          specialization === targetSpecialization
      );
      subjects.forEach(({ subjectCode }) =>
        textHolder.match(subjectCode.replace(/_/g, " "))
          ? subjectlist.push(subjectCode)
          : null
      );
    } else if ((yearLevel.data[0] as string).includes("nd")) {
      const subjects = secondYearSubjects.filter(
        ({ academicYear, specialization }) =>
          academicYear.semester === checkedSemester &&
          specialization === targetSpecialization
      );
      subjects.forEach(({ subjectCode }) =>
        textHolder.match(subjectCode.replace(/_/g, " "))
          ? subjectlist.push(subjectCode)
          : null
      );
    } else if ((yearLevel.data[0] as string).includes("rd")) {
      const subjects = thirdYearSubjects.filter(
        ({ academicYear, specialization }) =>
          academicYear.semester === checkedSemester &&
          specialization === targetSpecialization
      );
      subjects.forEach(({ subjectCode }) =>
        textHolder.match(subjectCode.replace(/_/g, " "))
          ? subjectlist.push(subjectCode)
          : null
      );
    } else if ((yearLevel.data[0] as string).includes("th")) {
      const subjects = fourthYearSubjects.filter(
        ({ academicYear, specialization }) =>
          academicYear.semester === checkedSemester &&
          specialization === targetSpecialization
      );
      subjects.forEach(({ subjectCode }) =>
        textHolder.match(subjectCode.replace(/_/g, " "))
          ? subjectlist.push(subjectCode)
          : null
      );
    }
    console.log({
      textHolder,
      checkedSemester,
      result,
      // TODO: Sort the Subject based on the Arrangement in the COG.
      set: new Set(subjectlist),
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
