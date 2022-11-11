import { travelFile } from "./add-file/functions/travelFile";

travelFile().then((result) => {
  console.log(JSON.stringify({ result }, null, 2));
});
