import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partOne',
    async setup() {
        const input = await GetInput(2024, 1);

        const listA: number[] = [];
        const listB: number[] = [];

        input.split("\r\n").forEach(row => {
            const values = row.split("   ");
            listA.push(Number.parseInt(values[0]));
            listB.push(Number.parseInt(values[1]));
        });

        listA.sort();
        listB.sort();

        let differenceTotal = 0;

        listA.forEach((value, index) => {
            differenceTotal += Math.abs(value - listB[index]);
        })

        const solution = differenceTotal;

        return { solution };
    },
}