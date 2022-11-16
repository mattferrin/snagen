/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import ts from "typescript";
import { logWalkInfo } from "../../add-file/functions/logWalkInfo";
import { Help, Units } from "../../add-file/functions/travelFile";
import { addResultValue } from "./addResultValue";

export function recurseExpression(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  expression: ts.Expression | undefined,
  result: Units,
  help: Help
): readonly [Units, Help] {
  // eslint-disable-next-line functional/no-expression-statement
  logWalkInfo(expression, help);

  if (expression === undefined) {
    return [result, help];
  } else if (ts.isPropertyAccessExpression(expression)) {
    // TODO: turn this log into property access spy result
    // eslint-disable-next-line functional/no-expression-statement
    console.log(
      "4efbf8cf-a00a-43de-961b-01e491afde33",
      expression.name.escapedText
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    return recurseExpression((expression as any).expression, result, help);
  } else if (
    ts.isCallExpression(expression) &&
    (expression.parent === undefined ||
      !ts.isVariableDeclaration(expression.parent))
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    const name = (expression?.expression as any)?.escapedText;

    return recurseExpression(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      (expression as any).expression,
      addResultValue(help, result, {
        name,
        tag: "return",
        value: `${name} result`,
      }),
      help
    );
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    return recurseExpression((expression as any).expression, result, help);
  }
}
