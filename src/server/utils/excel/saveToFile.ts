'server only';

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

export default function saveToFile(fileName: string, data: string) {
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
