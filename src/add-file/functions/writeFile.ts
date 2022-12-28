import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { travelFile } from "./travelFile";

export async function writeFile(file: string): Promise<void> {
  if (file.match(/\.snap\.[^.]+/) || fs.lstatSync(file).isDirectory()) {
    return; // ignore self written files
  } else {
    const data = await travelFile(file)
      .then((result) => {
        return result;
      })
      .catch((error: Error | string): string => {
        if (typeof error === "string") {
          return error;
        } else if (typeof error.message === "string") {
          return error.message;
        } else {
          return JSON.stringify(error); // expected that type might be wrong
        }
      });

    const extension = path.extname(file);
    return fsPromises.writeFile(
      `${file}.snap.test${extension}`,
      JSON.stringify(data)
    );
  }
}
