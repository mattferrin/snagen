import ts from "typescript";
import { Help, Units } from "../../add-file/functions/travelFile";
import { travelStatements } from "../../add-file/functions/travelStatements";
import { addRow } from "./addRow";

export function travelIfStatement(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  statement: ts.IfStatement,
  result: Units,
  help: Help
): readonly [Units, Help] {
  const [ifResult, ifHelp] = travelStatements(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    (statement.thenStatement as any).statements,
    result,
    help
  );

  const notIfResult = addRow(ifResult, "else");

  if (statement.elseStatement !== undefined) {
    return travelStatements(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      (statement.elseStatement as any).statements,
      notIfResult,
      ifHelp
    );
  } else {
    return [notIfResult, ifHelp];
  }
}
