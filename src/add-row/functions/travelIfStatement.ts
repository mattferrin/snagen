import ts from "typescript";
import { Help, Units } from "../../add-file/functions/travelFile";
import { travelStatements } from "../../add-file/functions/travelStatements";
import { addRow } from "./addRow";

export function travelIfStatement(
  statement: ts.IfStatement,
  result: Units,
  help: Help
): [Units, Help] {
  const [ifResult, ifHelp] = travelStatements(
    (statement.thenStatement as any).statements,
    result,
    help
  );

  const notIfResult = addRow(ifResult, "else");

  if (statement.elseStatement !== undefined) {
    return travelStatements(
      (statement.elseStatement as any).statements,
      notIfResult,
      ifHelp
    );
  } else {
    return [notIfResult, ifHelp];
  }
}
