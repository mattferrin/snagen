export function buildMutateNth<
  Result extends { [Property in keyof Result]: Array<Item> },
  Item
>(items: keyof Result) {
  return function mutateNth(
    nth: number,
    result: Result,
    mutation: (arg0: Item) => Item
  ): Result {
    return {
      ...result,
      [items]: [
        ...result[items].slice(0, nth),
        mutation(result[items][nth]),
        ...result[items].slice(nth + 1, result[items].length),
      ],
    };
  };
}
