export function buildMutateNth<
  Result extends { [Property in keyof Result]: Array<Item> },
  Item
>(items: keyof Result) {
  return function index(nth: number) {
    return function mutateNth(
      result: Result,
      mutation: (arg0: Item) => Item
    ): Result {
      const nonNegativeNth = nth < 0 ? result[items].length + nth : nth;

      return {
        ...result,
        [items]: [
          ...result[items].slice(0, nonNegativeNth),
          mutation(result[items][nonNegativeNth]),
          ...result[items].slice(nonNegativeNth + 1, result[items].length),
        ],
      };
    };
  };
}
