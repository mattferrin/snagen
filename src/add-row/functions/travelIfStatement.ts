import ts from "typescript";
import { Help, Units } from "../../add-file/functions/travelFile";
import { travelStatements } from "../../add-file/functions/travelStatements";
import { mutateNthUnit } from "../../add-unit/functions/mutateNthUnit";

export function travelIfStatement(
  statement: ts.IfStatement,
  result: Units,
  help: Help
): [Units, Help] {
  const [ifResult, ifHelp] = travelStatements(
    (statement.thenStatement as any).statements,
    result,
    help
  );

  const notIfResult = mutateNthUnit(-1)(ifResult, (unit) => {
    const lastRow = unit.rows.slice(-1)[0];

    return {
      ...unit,
      rows: [
        ...unit.rows,
        {
          args: lastRow.args.map((arg) => ({ name: arg.name })),
          comment: "else",
          results: [],
        },
      ],
    };
  });

  if (statement.elseStatement !== undefined) {
    return travelStatements(
      (statement.elseStatement as any).statements,
      notIfResult,
      ifHelp
    );
  } else {
    return [notIfResult, ifHelp];
  }
}
