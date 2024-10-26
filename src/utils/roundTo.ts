/** Handle both positive and negative with decimal.
 *
 * Modified to cater `TypeScript`,
 * _Reference [here](https://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places)._ */
export default function roundTo(n: number, digits?: number) {
  let negative = false;
  if (digits === undefined) {
    digits = 0;
  }
  if (n < 0) {
    negative = true;
    n = n * -1;
  }
  const multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  n = +(Math.round(n) / multiplicator).toFixed(digits);
  if (negative) {
    n = +(n * -1).toFixed(digits);
  }
  return n;
}
