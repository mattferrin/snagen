import ts from "typescript";
import { recurseDeclaration } from "../../add-result/functions/recurseDeclaration";
import { recurseExpression } from "../../add-result/functions/recurseExpression";
import { addRow } from "../../add-row/functions/addRow";
import { commentCaseClause } from "../../add-row/functions/commentCaseClause";
import { travelIfStatement } from "../../add-row/functions/travelIfStatement";
import { travelSwitchStatement } from "../../add-row/functions/travelSwitchStatement";
import { travelFunctionDeclaration } from "../../add-unit/functions/travelFunctionDeclaration";
import { logWalkInfo } from "./logWalkInfo";
import { next } from "./next";
import { travelBlock } from "./travelBlock";
import { Help, Units } from "./travelFile";
import { travelImportDeclaration } from "./travelImportDeclaration";
import { travelImportSpecifier } from "./travelImportSpecifier";

export function travelStatements(
  statements: ts.Statement[],
  result: Units,
  help: Help
): [Units, Help] {
  const statement = statements.find(() => true);
  logWalkInfo(statement, help);

  const twoLastArgs = [help, statements] as const;
  const threeLastArgs = [result, ...twoLastArgs] as const;

  if (statement === undefined) {
    return [result, help];
  } else if (ts.isTypeAliasDeclaration(statement)) {
    return travelStatements(statements.slice(1), result, help);
  } else if (ts.isImportSpecifier(statement)) {
    return next(travelImportSpecifier, statement, ...threeLastArgs);
  } else if (ts.isImportDeclaration(statement)) {
    return next(travelImportDeclaration, statement, ...threeLastArgs);
  } else if (ts.isBlock(statement)) {
    return next(travelBlock, statement, ...threeLastArgs);
  } else if (ts.isVariableStatement(statement)) {
    const latest = next(
      recurseDeclaration,
      Array.from(statement.declarationList.declarations),
      ...threeLastArgs
    );
    return travelStatements(statements.slice(1), ...latest);
  } else if (ts.isFunctionDeclaration(statement)) {
    return next(travelFunctionDeclaration, statement, ...threeLastArgs);
  } else if (ts.isIfStatement(statement)) {
    return next(travelIfStatement, statement, ...threeLastArgs);
  } else if (ts.isSwitchStatement(statement)) {
    return next(travelSwitchStatement, statement, ...threeLastArgs);
  } else if (ts.isCaseClause(statement)) {
    if (help.switchHelp === "case") {
      return travelStatements(
        Array.from(statement.statements),
        addRow(result, commentCaseClause(statement)),
        help
      );
    } else if (help.switchHelp === "switch") {
      return travelStatements(Array.from(statement.statements), result, {
        ...help,
        switchHelp: "case",
      });
    } else {
      throw new Error("unexpected case clause");
    }
  } else if (ts.isExpressionStatement(statement)) {
    const [latestResult, latestHelp] = recurseExpression(
      statement.expression,
      result,
      help
    );

    return travelStatements(statements.slice(1), latestResult, {
      ...latestHelp,
      switchHelp: "case",
    });
  } else if (ts.isReturnStatement(statement)) {
    const [latestResult, latestHelp] = recurseExpression(
      statement.expression,
      result,
      help
    );

    return travelStatements(statements.slice(1), latestResult, {
      ...latestHelp,
      switchHelp: "case",
    });
  } else {
    throw new Error(`unexpected statement of ${ts.SyntaxKind[statement.kind]}`);
  }
}
