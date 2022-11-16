import { travelFile } from "./add-file/functions/travelFile";

const isLog = true;

// eslint-disable-next-line functional/no-expression-statement, @typescript-eslint/no-floating-promises, functional/no-return-void
travelFile().then(
  // eslint-disable-next-line functional/no-return-void, @typescript-eslint/prefer-readonly-parameter-types
  (result) => {
    // eslint-disable-next-line functional/no-conditional-statement
    if (isLog) {
      // eslint-disable-next-line functional/no-expression-statement
      console.log(JSON.stringify({ result }, null, 2));
    }
  }
);
