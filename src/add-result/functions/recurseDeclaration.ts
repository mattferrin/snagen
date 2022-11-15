import ts from "typescript";
import { logWalkInfo } from "../../add-file/functions/logWalkInfo";
import { Help, Units } from "../../add-file/functions/travelFile";
import { addResultValue } from "./addResultValue";
import { resultValue } from "./resultValue";

export function recurseDeclaration(
  declarations: ts.VariableDeclaration[],
  result: Units,
  help: Help
): [Units, Help] {
  const first = declarations[0];
  logWalkInfo(first, help);

  if (first === undefined) {
    return [result, help];
  } else if (first.initializer === undefined) {
    throw new Error("unexpected undefined declaration initializer");
  } else if (ts.isCallExpression(first.initializer)) {
    return recurseDeclaration(
      declarations.slice(1),
      addResultValue(help, result, resultValue(first)),
      help
    );
  } else {
    throw new Error("unexpected unmatched recurse declaration name");
  }
}
