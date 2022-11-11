import ts from "typescript";
import { Help, Units } from "../../add-file/functions/travelFile";
import { travelStatements } from "../../add-file/functions/travelStatements";
import { recurseTailRow } from "./recurseTailRow";

export function travelSwitchStatement(
  statement: ts.SwitchStatement,
  result: Units,
  help: Help
) {
  const [lastResult, lastHelp] = travelStatements(
    Array.from(statement.caseBlock.clauses[0].statements),
    result,
    {
      ...help,
      switchHelp: "switch",
    }
  );

  return recurseTailRow(
    statement.caseBlock.clauses.slice(1),
    lastResult,
    lastHelp
  );
}
