import { ConditionalPick } from "type-fest";
import { Row, Unit } from "../../add-file/functions/travelFile";
import { buildMutateNth } from "../../other/functions/buildMutateNth";

export const mutateNthRow = buildMutateNth<
  ConditionalPick<Unit, ReadonlyArray<unknown>>,
  Row
>("rows");
