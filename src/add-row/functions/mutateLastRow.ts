import { Row, Unit } from "../../add-file/functions/travelFile";
import { mutateNthRow } from "./mutateNthRow";

export function mutateLastRow(
  result: Unit,
  mutation: (arg0: Row) => Row
): Unit {
  return mutateNthRow(result.rows.length - 1, result, mutation);
}
