import { promises as fs } from "fs";
import * as ts from "typescript";
import { travelStatements } from "./travelStatements";

export type Xput = {
  readonly tag?: "value" | "return" | "throw";
  readonly name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly value?: any;
};
export type Row = {
  readonly comment: string;
  readonly args: readonly Xput[];
  readonly results: readonly Xput[];
};
export type Variable = { readonly name: string };
export type Scope = {
  readonly kind: ts.SyntaxKind;
  readonly variables: readonly Variable[];
};
export type Unit = {
  readonly name?: string;
  readonly rows: readonly Row[];
};
export type Units = {
  readonly units: readonly Unit[];
};

export type InitializedSwitchHelp = "switch" | "case";
type SwitchHelp = "initial" | InitializedSwitchHelp;
export type Help = {
  readonly switchHelp: SwitchHelp;
  readonly scopeStack: readonly Scope[];
};

// eslint-disable-next-line functional/functional-parameters
export async function travelFile(
  file: string
): Promise<readonly [Units, Help]> {
  const code = await fs.readFile(file, "binary");
  const node = ts.createSourceFile(
    "imaginary.ts",
    code,
    ts.ScriptTarget.Latest
  );

  if (ts.isSourceFile(node)) {
    return travelStatements(
      Array.from(node.statements),
      { units: [] },
      {
        switchHelp: "initial",
        scopeStack: [{ kind: node.kind, variables: [] }],
      }
    );
  } else {
    // eslint-disable-next-line functional/no-throw-statement
    throw new Error("expected a source file");
  }
}
