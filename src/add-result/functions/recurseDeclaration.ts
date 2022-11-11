import ts from "typescript";
import { Help, Units } from "../../add-file/functions/travelFile";
import { mutateLastRow } from "../../add-row/functions/mutateLastRow";
import { mutateLastUnit } from "../../add-unit/functions/mutateLastUnit";
import { resultValue } from "./resultValue";

export function recurseDeclaration(
  declarations: ts.VariableDeclaration[],
  result: Units,
  help: Help
): [Units, Help] {
  const first = declarations[0];

  if (first === undefined) {
    return [result, help];
  } else if (first.initializer === undefined) {
    throw new Error("unexpected undefined declaration initializer");
  } else if (ts.isCallExpression(first.initializer)) {
    return recurseDeclaration(
      declarations.slice(1),
      mutateLastUnit(result, (unit) =>
        mutateLastRow(unit, (row) => ({
          ...row,
          results: [...row.results, resultValue(first)],
        }))
      ),
      help
    );
  } else {
    throw new Error("unexpected unmatched recurse declaration name");
  }
}
