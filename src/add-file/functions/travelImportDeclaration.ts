import ts from "typescript";
import { mutateNthScope } from "./mutateNthUnit";
import { Help, Units } from "./travelFile";
import { travelStatements } from "./travelStatements";

export function travelImportDeclaration(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  statement: ts.ImportDeclaration,
  result: Units,
  help: Help
): readonly [Units, Help] {
  return travelStatements(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    (statement.importClause?.namedBindings as any)?.elements ?? [],
    result,
    statement.importClause?.name !== undefined
      ? (mutateNthScope(-1)(help, (scope) => ({
          ...scope,
          variables: [
            ...scope.variables,
            {
              name:
                statement.importClause?.name?.escapedText.toString() ??
                "NOT possible",
            },
          ],
        })) as Help)
      : help
  );
}
