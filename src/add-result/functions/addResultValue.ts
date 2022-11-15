import ts from "typescript";
import { Help, Units, Xput } from "../../add-file/functions/travelFile";
import { mutateNthRow } from "../../add-row/functions/mutateNthRow";
import { mutateNthUnit } from "../../add-unit/functions/mutateNthUnit";

export function addResultValue(help: Help, result: Units, latestResult: Xput) {
  return help.scopeStack[1]?.kind === ts.SyntaxKind.FunctionDeclaration
    ? mutateNthUnit(-1)(result, (unit) =>
        mutateNthRow(-1)(unit, (row) => ({
          ...row,
          results: [...row.results, latestResult],
        }))
      )
    : result;
}
