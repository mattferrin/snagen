import ts from "typescript";
import { Row } from "../../add-file/functions/travelFile";

export function resultValue(
  first: ts.VariableDeclaration
): Row["results"][number] {
  const name = (first.initializer as any)?.expression?.escapedText;

  if (ts.isIdentifier(first.name)) {
    return { name, tag: "return", value: `${name} result` };
  } else if (ts.isObjectBindingPattern(first.name)) {
    const value = Object.fromEntries(
      first.name.elements.map((element) => {
        const propertyName = ((element as any).name as any).escapedText;
        return [propertyName, `${name} result ${propertyName}`];
      })
    );

    return {
      name,
      tag: "return",
      value,
    };
  } else if (ts.isArrayBindingPattern(first.name)) {
    const value = first.name.elements.map((element) => {
      const propertyName = ((element as any).name as any).escapedText;
      console.log("453c8610-da11-4733-834a-f12f2cca6f6b", propertyName);
      return `${name} result ${propertyName}`;
    });

    return {
      name,
      tag: "return",
      value,
    };
  } else {
    throw new Error("unexpected unmatched recurse declaration name");
  }
}
