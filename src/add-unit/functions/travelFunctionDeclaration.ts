import ts from "typescript";
import { Help, Unit, Units } from "../../add-file/functions/travelFile";
import { travelStatements } from "../../add-file/functions/travelStatements";

export function travelFunctionDeclaration(
  statement: ts.FunctionDeclaration,
  result: Units,
  help: Help
): [Units, Help] {
  const args = statement.parameters.map((param) => ({
    name: (param.name as any).escapedText,
  }));
  const unit: Unit = {
    name: statement.name?.escapedText.toString(),
    rows: [
      {
        args,
        results: [],
      },
    ],
  };

  if (statement.body !== undefined) {
    const [bodyResult, bodyHelp] = travelStatements(
      Array.from(statement.body.statements),
      {
        ...result,
        units: [...result.units, unit],
      },
      {
        ...help,
        scopeStack: [
          ...help.scopeStack,
          { kind: statement.kind, variables: args },
        ],
      }
    );
    return [
      bodyResult,
      { ...bodyHelp, scopeStack: bodyHelp.scopeStack.slice(0, -1) },
    ];
  } else {
    throw new Error("unexpected FunctionDeclaration without body");
  }
}
