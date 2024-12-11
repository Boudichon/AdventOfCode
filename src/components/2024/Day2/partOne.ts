import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partOne',
    async setup() {
        const input = await GetInput(2024, 2);

        let safeReportsCount = 0;

        input.split("\r\n").forEach((row, index) => {
            const values = row.split(" ").map(x => Number.parseInt(x));

            let isSafe = false;

            isSafe = isArrayIncreasing(values) || isArrayIncreasing(values.reverse());

            if (isSafe) {
                ++safeReportsCount;
            }

            function isArrayIncreasing(reports: number[]) {
                for (let i = 0; i < reports.length - 1; ++i) {
                    if (reports[i] >= reports[i + 1] || reports[i + 1] > reports[i] + 3) {
                        return false;
                    }
                }
                return true;
            }
        });

        const solution = safeReportsCount;

        return { solution };
    },
}