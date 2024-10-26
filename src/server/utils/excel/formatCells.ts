'server only';

import type { Row } from 'read-excel-file';

export default function formatCells(array: Row) {
  return array.map((value) =>
    value === null
      ? null
      : value.toLocaleString().replace(/ /g, '_').toLocaleUpperCase()
  );
}
