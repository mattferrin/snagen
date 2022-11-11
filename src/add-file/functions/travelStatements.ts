import ts from "typescript";
import { recurseDeclaration } from "../../add-result/functions/recurseDeclaration";
import { recurseExpression } from "../../add-result/functions/recurseExpression";
import { travelIfStatement } from "../../add-row/functions/travelIfStatement";
import { travelSwitchStatement } from "../../add-row/functions/travelSwitchStatement";
import { mutateLastUnit } from "../../add-unit/functions/mutateLastUnit";
import { travelFunctionDeclaration } from "../../add-unit/functions/travelFunctionDeclaration";
import { next } from "./next";
import { Help, Units } from "./travelFile";

export function travelStatements(
  statements: ts.Statement[],
  result: Units,
  help: Help
): [Units, Help] {
  const statement = statements.find(() => true);
  const tail = statements.slice(1);
  const twoLastArgs = [help, tail] as const;
  const threeLastArgs = [result, ...twoLastArgs] as const;

  if (statement === undefined) {
    return [result, help];
  } else if (ts.isVariableStatement(statement)) {
    const latest = next(
      recurseDeclaration,
      Array.from(statement.declarationList.declarations),
      ...threeLastArgs
    );
    return next(travelStatements, statements.slice(1), ...latest, tail);
  } else if (ts.isFunctionDeclaration(statement)) {
    return next(travelFunctionDeclaration, statement, ...threeLastArgs);
  } else if (ts.isIfStatement(statement)) {
    return next(travelIfStatement, statement, ...threeLastArgs);
  } else if (ts.isSwitchStatement(statement)) {
    return next(travelSwitchStatement, statement, ...threeLastArgs);
  } else if (ts.isCaseClause(statement)) {
    if (help.switchHelp === "case") {
      return next(
        travelStatements,
        Array.from(statement.statements),
        mutateLastUnit(result, (unit) => {
          const lastRow = unit.rows.slice(-1)[0];

          return {
            ...unit,
            rows: [...unit.rows, lastRow],
          };
        }),
        ...twoLastArgs
      );
    } else {
      return next(
        travelStatements,
        Array.from(statement.statements),
        result,
        {
          ...help,
          switchHelp: "case",
        },
        tail
      );
    }
  } else if (ts.isExpressionStatement(statement)) {
    const [latestResult, latestHelp] = recurseExpression(
      statement.expression,
      result,
      help
    );

    return next(
      travelStatements,
      statements.slice(1),
      latestResult,
      {
        ...latestHelp,
        switchHelp: "case",
      },
      tail
    );
  } else if (ts.isReturnStatement(statement)) {
    const [latestResult, latestHelp] = recurseExpression(
      statement.expression,
      result,
      help
    );

    return next(
      travelStatements,
      statements.slice(1),
      latestResult,
      {
        ...latestHelp,
        switchHelp: "case",
      },
      tail
    );
  } else {
    throw new Error("unexpected statement of unhandled kind");
  }
}
