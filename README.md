This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

There are 3 modules for computation for the students.

- Grades - 25%
  - Calculation for the grades:
    - a = 50%
    - b = 30%
    - c = 20%
- Certificates - 25%
  - Calculation for certificates:
    - a = 3
    - b = 2
    - c = 1
  - If the student has taken the certificate needed for the Job, it will be automatically placed in the result.
- Internship - 50%
  - Calculation for internship:
    - Grade = 33.33%
    - Tasks = 33.33%
    - Type of Company = 33.33%

These 3 modules will have a breakdown of the Jobs well suited for the students.

---

Issues:

- ~~TypeError: Promise.withResolvers is not a function in react-pdftotext that is using [react-pdf](https://github.com/mozilla/pdf.js), here the [solutions](https://stackoverflow.com/questions/78415681/pdf-js-pdfjs-dist-promise-withresolvers-is-not-a-function), **TLDR**: _this is due to NodeJS < v22_.~~ _(Resolved with [`pdf2json`](https://github.com/modesty/pdf2json) package.)_
