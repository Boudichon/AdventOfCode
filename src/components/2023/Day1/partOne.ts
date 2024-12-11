import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partOne',
    async setup() {
        const input = await GetInput(2023, 1);
        let total = 0;

        input.split("\r\n").forEach(row => {
            const cleanedRow = row.replace(/\D/g,'');
            total += Number.parseInt(cleanedRow[0] + "" + cleanedRow[cleanedRow.length-1]);
        });

        const solution = total;

        return { solution };
    },
}