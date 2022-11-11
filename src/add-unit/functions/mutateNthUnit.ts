import { ConditionalPick } from "type-fest";
import { Unit, Units } from "../../add-file/functions/travelFile";
import { buildMutateNth } from "../../other/functions/buildMutateNth";

export const mutateNthUnit = buildMutateNth<
  ConditionalPick<Units, Array<unknown>>,
  Unit
>("units");
