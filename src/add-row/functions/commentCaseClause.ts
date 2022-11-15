import ts from "typescript";

export function commentCaseClause(statement: ts.CaseClause | ts.DefaultClause) {
  if (ts.isCaseClause(statement) && ts.isStringLiteral(statement.expression)) {
    return `case ${statement.expression.text}`;
  } else {
    throw new Error("b304f0aa-a7f0-48ba-b77d-a33fe0b7c068");
  }
}
