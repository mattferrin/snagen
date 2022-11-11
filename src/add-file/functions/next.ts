import ts from "typescript";
import { Help, Units } from "./travelFile";
import { travelStatements } from "./travelStatements";

type Travel<T> = (statement: T, result: Units, help: Help) => [Units, Help];

export function next<T>(
  travel: Travel<T>,
  statement: T,
  result: Units,
  help: Help,
  tail: ts.Statement[]
) {
  return travelStatements(tail, ...travel(statement, result, help));
}
