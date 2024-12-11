import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partTwo',
    async setup() {
        const input = await GetInput(2024, 1);

        const listA: number[] = [];
        const listB: number[] = [];

        input.split("\r\n").forEach(row => {
            const values = row.split("   ");
            listA.push(Number.parseInt(values[0]));
            listB.push(Number.parseInt(values[1]));
        });

        let similarityScore = 0;

        listA.forEach((value) => {
            similarityScore += value * listB.filter(x => x == value).length;
        })

        const solution = similarityScore;

        return { solution };
    },
}