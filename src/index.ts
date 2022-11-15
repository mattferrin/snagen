import { travelFile } from "./add-file/functions/travelFile";

const isLog = true;

travelFile().then((result) => {
  if (isLog) {
    console.log(JSON.stringify({ result }, null, 2));
  }
});
