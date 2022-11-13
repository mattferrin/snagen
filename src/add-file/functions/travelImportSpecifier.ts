import ts from "typescript";
import { mutateNthScope } from "./mutateNthUnit";
import { Help, Units } from "./travelFile";

export function travelImportSpecifier(
  statement: ts.ImportSpecifier,
  result: Units,
  help: Help
): [Units, Help] {
  return [
    result,
    mutateNthScope(-1)(help, (scope) => ({
      ...scope,
      variables: [
        ...scope.variables,
        { name: statement.name.escapedText.toString() },
      ],
    })) as Help,
  ];
}
