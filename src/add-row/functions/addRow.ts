import { Units } from "../../add-file/functions/travelFile";
import { mutateNthUnit } from "../../add-unit/functions/mutateNthUnit";

export function addRow(result: Units, comment: string) {
  return mutateNthUnit(-1)(result, (unit) => {
    const lastRow = unit.rows.slice(-1)[0];

    return {
      ...unit,
      rows: [
        ...unit.rows,
        {
          args: lastRow.args.map((arg) => ({ name: arg.name })),
          comment,
          results: [],
        },
      ],
    };
  });
}
