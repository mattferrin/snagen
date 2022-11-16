import ts from "typescript";
import { Row } from "../../add-file/functions/travelFile";

export function resultValue(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  first: ts.VariableDeclaration
): Row["results"][number] {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  const name = (first.initializer as any)?.expression?.escapedText;

  if (ts.isIdentifier(first.name)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-assignment
    return { name, tag: "return", value: `${name} result` };
  } else if (ts.isObjectBindingPattern(first.name)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const value = Object.fromEntries(
      first.name.elements.map(
        // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
        (element) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
          const propertyName = (element as any).name.escapedText;
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          return [propertyName, `${name} result ${propertyName}`];
        }
      )
    );

    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      name,
      tag: "return",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      value,
    };
  } else if (ts.isArrayBindingPattern(first.name)) {
    const value = first.name.elements.map(
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      (element) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        const propertyName = (element as any).name.escapedText;
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return `${name} result ${propertyName}`;
      }
    );

    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      name,
      tag: "return",
      value,
    };
  } else {
    // eslint-disable-next-line functional/no-throw-statement
    throw new Error("unexpected unmatched recurse declaration name");
  }
}
