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
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  clauses: readonly ts.CaseOrDefaultClause[],
  result: Units,
  help: Help,
  switchHelp: InitializedSwitchHelp
) {
  const firstClause = clauses[0];
  // eslint-disable-next-line functional/no-expression-statement
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
