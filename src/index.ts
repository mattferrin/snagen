/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-expression-statement */

import fs from "fs";
import glob from "glob";
import path from "path";
import { writeFile } from "./add-file/functions/writeFile";

/**
 * dynamic test generation on file change
 */
fs.watch(
  process.argv[2],
  { recursive: true },
  function (_event, filename: string) {
    writeFile(path.resolve("src", filename));
  }
);

/**
 * initial test generation for every file
 */
glob("src/**/*.ts", { nodir: true }, function (error, files) {
  if (error) {
    console.error(error);
  } else {
    files.forEach((file) => {
      writeFile(file);
    });
  }
});
