import ts from "typescript";
import { Help, Units } from "./travelFile";
import { travelStatements } from "./travelStatements";

export function travelBlock(
  statement: ts.Block,
  result: Units,
  helpIn: Help
): [Units, Help] {
  const help: Help =
    statement !== undefined && ts.isBlock(statement)
      ? // entering and stacking new block scope
        {
          ...helpIn,
          scopeStack: [
            ...helpIn.scopeStack,
            { kind: statement.kind, variables: [] },
          ],
        }
      : helpIn;

  return travelStatements(Array.from(statement.statements), result, help);
}
