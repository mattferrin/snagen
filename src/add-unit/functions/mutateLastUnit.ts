import { Unit, Units } from "../../add-file/functions/travelFile";
import { mutateNthUnit } from "./mutateNthUnit";

export function mutateLastUnit(
  result: Units,
  mutation: (arg0: Unit) => Unit
): Units {
  return mutateNthUnit(result.units.length - 1, result, mutation);
}
