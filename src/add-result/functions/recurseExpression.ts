import ts from "typescript";
import { logWalkInfo } from "../../add-file/functions/logWalkInfo";
import { Help, Units } from "../../add-file/functions/travelFile";
import { addResultValue } from "./addResultValue";

export function recurseExpression(
  expression: ts.Expression | undefined,
  result: Units,
  help: Help
): [Units, Help] {
  logWalkInfo(expression, help);

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
      addResultValue(help, result, {
        name,
        tag: "return",
        value: `${name} result`,
      }),
      help
    );
  } else {
    return recurseExpression((expression as any).expression, result, help);
  }
}
