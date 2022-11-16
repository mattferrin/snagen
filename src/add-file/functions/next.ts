import ts from "typescript";
import { Help, Units } from "./travelFile";
import { travelStatements } from "./travelStatements";

type Travel<T> = (
  statement: T,
  result: Units,
  help: Help
) => readonly [Units, Help];

export function next<T>(
  travel: Travel<T>,
  statement: T,
  result: Units,
  help: Help,
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  tail: readonly ts.Statement[]
): readonly [Units, Help] {
  const [resultOut, helpOut] = travelStatements(
    tail.slice(1),
    ...travel(statement, result, help)
  );

  if (ts.isBlock(tail[0])) {
    // exiting and unstacking old block scope
    return [resultOut, { ...help, scopeStack: help.scopeStack.slice(0, -1) }];
  } else {
    return [resultOut, helpOut];
  }
}
