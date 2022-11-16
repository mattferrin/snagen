import ts from "typescript";
import { Help } from "./travelFile";

type Kinded = { readonly kind: ts.SyntaxKind };

const isLog = false;

// eslint-disable-next-line functional/no-return-void
export function logWalkInfo(kinded: Kinded | undefined, help: Help): void {
  // eslint-disable-next-line functional/no-conditional-statement
  if (kinded !== undefined && isLog) {
    // eslint-disable-next-line functional/no-expression-statement
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
