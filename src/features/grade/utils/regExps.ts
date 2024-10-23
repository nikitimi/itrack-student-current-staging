// Ensure that the target is referencing the `parsingStatus.ts` in shared utils.
export default [
  { name: "studentNumber", regExp: /\d{10}/, target: "header" },
  { name: "academicYear", regExp: /\d{4}-\d{4}/, target: "header" },
  {
    name: "yearLevel",
    regExp: /(\d{1}(st|nd|rd|th))+( )+Year/,
    target: "header",
  },
  {
    name: "semester",
    regExp: /(\d{1}(st|nd|rd|th))+( )+Semester/,
    target: "header",
  },
  { name: "grade", regExp: /\d{1}.\d{2}/g, target: "body" },
] as const;
