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
): [Units, Help] {
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
