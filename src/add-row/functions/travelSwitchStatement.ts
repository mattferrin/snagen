import ts from "typescript";
import { Help, Units } from "../../add-file/functions/travelFile";
import { addCaseRow } from "./addCaseRow";

export function travelSwitchStatement(
  statement: ts.SwitchStatement,
  result: Units,
  help: Help
) {
  const clauses = statement.caseBlock.clauses;

  return addCaseRow(Array.from(clauses), result, help, "switch");
}
