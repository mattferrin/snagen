import ts from "typescript";
import { Help, Units } from "../../add-file/functions/travelFile";
import { travelStatements } from "../../add-file/functions/travelStatements";

export function recurseTailRow(
  clauses: ts.CaseOrDefaultClause[],
  result: Units,
  help: Help
): [Units, Help] {
  if (clauses.length === 0) {
    return [result, help];
  } else {
    const [lastResult, lastHelp] = travelStatements(
      Array.from(clauses[0].statements),
      result,
      {
        ...help,
        switchHelp: "case",
      }
    );

    return recurseTailRow(clauses.slice(1), lastResult, lastHelp);
  }
}
