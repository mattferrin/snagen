import ts from "typescript";
import { Help } from "./travelFile";

type Kinded = { kind: ts.SyntaxKind };

const isLog = true;
export function logWalkInfo(kinded: Kinded | undefined, help: Help): void {
  if (kinded !== undefined && isLog) {
    console.log(
      JSON.stringify(
        {
          kind: ts.SyntaxKind[kinded.kind],
          scopeStack: help.scopeStack,
        },
        null,
        2
      )
    );
  }
}
