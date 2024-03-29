import ts from "typescript";

export function commentCaseClause(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  statement: ts.CaseClause | ts.DefaultClause
) {
  if (ts.isCaseClause(statement) && ts.isStringLiteral(statement.expression)) {
    return `case ${statement.expression.text}`;
  } else {
    // eslint-disable-next-line functional/no-throw-statement
    throw new Error("b304f0aa-a7f0-48ba-b77d-a33fe0b7c068");
  }
}
