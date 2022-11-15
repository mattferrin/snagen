import ts from "typescript";
import { logWalkInfo } from "../../add-file/functions/logWalkInfo";
import {
  Help,
  InitializedSwitchHelp,
  Units,
} from "../../add-file/functions/travelFile";
import { travelStatements } from "../../add-file/functions/travelStatements";
import { addRow } from "./addRow";
import { commentCaseClause } from "./commentCaseClause";
import { recurseTailRow } from "./recurseTailRow";

export function addCaseRow(
  clauses: ts.CaseOrDefaultClause[],
  result: Units,
  help: Help,
  switchHelp: InitializedSwitchHelp
) {
  const firstClause = clauses[0];
  logWalkInfo(firstClause, help);

  const [lastResult, lastHelp] = travelStatements(
    Array.from(firstClause.statements),
    addRow(result, commentCaseClause(firstClause)),
    {
      ...help,
      switchHelp,
    }
  );

  return recurseTailRow(clauses.slice(1), lastResult, lastHelp);
}
