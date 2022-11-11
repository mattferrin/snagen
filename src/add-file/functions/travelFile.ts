import { promises as fs } from "fs";
import * as ts from "typescript";
import { travelStatements } from "./travelStatements";

type Xput = {
  tag?: "value" | "return" | "throw";
  name: string;
  value?: Object;
};
export type Row = {
  comment?: string;
  args: Xput[];
  results: Xput[];
};
export type Unit = {
  name?: string;
  rows: Row[];
};
export type Units = {
  units: Unit[];
};

type SwitchHelp = "initial" | "switch" | "case";
export type Help = {
  switchHelp: SwitchHelp;
};

export async function travelFile() {
  const code = await fs.readFile(process.argv[2], "binary");
  const node = ts.createSourceFile(
    "imaginary.ts",
    code,
    ts.ScriptTarget.Latest
  );

  if (ts.isSourceFile(node)) {
    return travelStatements(
      Array.from(node.statements),
      { units: [] },
      { switchHelp: "initial" }
    );
  } else {
    throw new Error("expected a source file");
  }
}
