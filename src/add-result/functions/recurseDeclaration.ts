import ts from "typescript";
import { logWalkInfo } from "../../add-file/functions/logWalkInfo";
import { Help, Units } from "../../add-file/functions/travelFile";
import { mutateNthRow } from "../../add-row/functions/mutateNthRow";
import { mutateNthUnit } from "../../add-unit/functions/mutateNthUnit";
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
      help.scopeStack[1]?.kind === ts.SyntaxKind.FunctionDeclaration
        ? mutateNthUnit(-1)(result, (unit) =>
            mutateNthRow(-1)(unit, (row) => ({
              ...row,
              results: [...row.results, resultValue(first)],
            }))
          )
        : result,
      help
    );
  } else {
    throw new Error("unexpected unmatched recurse declaration name");
  }
}
