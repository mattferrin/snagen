import ts from "typescript";
import { logWalkInfo } from "../../add-file/functions/logWalkInfo";
import { Help, Units } from "../../add-file/functions/travelFile";
import { addResultValue } from "./addResultValue";
import { resultValue } from "./resultValue";

export function recurseDeclaration(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  declarations: readonly ts.VariableDeclaration[],
  result: Units,
  help: Help
): readonly [Units, Help] {
  const first = declarations[0];
  // eslint-disable-next-line functional/no-expression-statement
  logWalkInfo(first, help);

  if (first === undefined) {
    return [result, help];
  } else if (first.initializer === undefined) {
    // eslint-disable-next-line functional/no-throw-statement
    throw new Error("unexpected undefined declaration initializer");
  } else if (ts.isCallExpression(first.initializer)) {
    return recurseDeclaration(
      declarations.slice(1),
      addResultValue(help, result, resultValue(first)),
      help
    );
  } else {
    // eslint-disable-next-line functional/no-throw-statement
    throw new Error("unexpected unmatched recurse declaration name");
  }
}
