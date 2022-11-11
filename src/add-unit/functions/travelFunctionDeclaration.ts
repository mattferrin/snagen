import ts from "typescript";
import { Help, Unit, Units } from "../../add-file/functions/travelFile";
import { travelStatements } from "../../add-file/functions/travelStatements";

export function travelFunctionDeclaration(
  statement: ts.FunctionDeclaration,
  result: Units,
  help: Help
) {
  const unit: Unit = {
    name: statement.name?.escapedText.toString(),
    rows: [
      {
        args: statement.parameters.map((param) => ({
          name: (param.name as any).escapedText,
        })),
        results: [],
      },
    ],
  };

  if (statement.body !== undefined) {
    return travelStatements(
      Array.from(statement.body.statements),
      {
        ...result,
        units: [...result.units, unit],
      },
      help
    );
  } else {
    throw new Error("unexpected FunctionDeclaration without body");
  }
}
