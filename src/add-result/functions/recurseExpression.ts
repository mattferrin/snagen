import ts from "typescript";
import { Help, Units } from "../../add-file/functions/travelFile";
import { mutateLastRow } from "../../add-row/functions/mutateLastRow";
import { mutateLastUnit } from "../../add-unit/functions/mutateLastUnit";

export function recurseExpression(
  expression: ts.Expression | undefined,
  result: Units,
  help: Help
): [Units, Help] {
  if (expression === undefined) {
    return [result, help];
  } else if (ts.isPropertyAccessExpression(expression)) {
    // TODO: turn this log into property access spy result
    console.log(
      "4efbf8cf-a00a-43de-961b-01e491afde33",
      expression.name.escapedText
    );
    return recurseExpression((expression as any).expression, result, help);
  } else if (
    ts.isCallExpression(expression) &&
    (expression.parent === undefined ||
      !ts.isVariableDeclaration(expression.parent))
  ) {
    const name = (expression?.expression as any)?.escapedText;

    return recurseExpression(
      (expression as any).expression,
      mutateLastUnit(result, (unit) =>
        mutateLastRow(unit, (row) => ({
          ...row,
          results: [
            ...row.results,
            { name, tag: "return", value: `${name} result` },
          ],
        }))
      ),
      help
    );
  } else {
    return recurseExpression((expression as any).expression, result, help);
  }
}
