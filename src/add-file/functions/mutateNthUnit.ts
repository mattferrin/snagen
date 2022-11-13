import { ConditionalPick } from "type-fest";
import { Help, Scope } from "../../add-file/functions/travelFile";
import { buildMutateNth } from "../../other/functions/buildMutateNth";

export const mutateNthScope = buildMutateNth<
  ConditionalPick<Help, Array<unknown>>,
  Scope
>("scopeStack");
