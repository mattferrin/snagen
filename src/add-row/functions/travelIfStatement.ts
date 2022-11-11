import ts from "typescript";
import { Help, Units } from "../../add-file/functions/travelFile";
import { travelStatements } from "../../add-file/functions/travelStatements";
import { mutateLastUnit } from "../../add-unit/functions/mutateLastUnit";

export function travelIfStatement(
  statement: ts.IfStatement,
  result: Units,
  help: Help
): [Units, Help] {
  if (statement.thenStatement) {
    const [ifResult, ifHelp] = travelStatements(
      (statement.thenStatement as any).statements,
      result,
      help
    );

    if (statement.elseStatement) {
      return travelStatements(
        (statement.elseStatement as any).statements,
        mutateLastUnit(ifResult, (unit) => {
          const lastRow = unit.rows.slice(-1)[0];

          return {
            ...unit,
            rows: [...unit.rows, lastRow],
          };
        }),
        ifHelp
      );
    } else {
      throw new Error("unexpected not an elseStatement");
    }
  } else {
    throw new Error("unexpected IfStatement without else");
  }
}
