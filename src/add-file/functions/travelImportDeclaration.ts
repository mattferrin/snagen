import ts from "typescript";
import { mutateNthScope } from "./mutateNthUnit";
import { Help, Units } from "./travelFile";
import { travelStatements } from "./travelStatements";

export function travelImportDeclaration(
  statement: ts.ImportDeclaration,
  result: Units,
  help: Help
): [Units, Help] {
  return travelStatements(
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
