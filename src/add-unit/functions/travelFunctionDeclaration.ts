import ts from "typescript";
import { Help, Unit, Units } from "../../add-file/functions/travelFile";
import { travelStatements } from "../../add-file/functions/travelStatements";

export function travelFunctionDeclaration(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  statement: ts.FunctionDeclaration,
  result: Units,
  help: Help
): readonly [Units, Help] {
  const args = statement.parameters.map(
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    (param) => ({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      name: (param.name as any).escapedText,
    })
  );
  const unit: Unit = {
    name: statement.name?.escapedText.toString(),
    rows: [
      {
        args: args,
        comment: "initial",
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
    // eslint-disable-next-line functional/no-throw-statement
    throw new Error("unexpected FunctionDeclaration without body");
  }
}
