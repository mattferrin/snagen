import ts from "typescript";
import { Help, Units } from "../../add-file/functions/travelFile";
import { addCaseRow } from "./addCaseRow";

export function recurseTailRow(
  clauses: ts.CaseOrDefaultClause[],
  result: Units,
  help: Help
): [Units, Help] {
  if (clauses.length === 0) {
    return [result, help];
  } else {
    return addCaseRow(clauses, result, help, "case");
  }
}
