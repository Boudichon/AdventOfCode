import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partTwo',
    async setup() {
        const input = await GetInput(2024, 2);

        let safeReportsCount = 0;

        input.split("\r\n").forEach((row) => {
            const values = row.split(" ").map(x => Number.parseInt(x));

            const isSafe = isArrayIncreasingWithTolerance(values) || isArrayIncreasingWithTolerance(values.reverse());

            if (isSafe) {
                ++safeReportsCount;
            }
            
            function isArrayIncreasingWithTolerance(reports: number[], canSkip: boolean = true): boolean {
                let isArraySafe = true;
                let failedIndex = 0;
                for (let i = 0; i < reports.length - 1; ++i) {
                    if (reports[i] >= reports[i + 1] || reports[i + 1] > reports[i] + 3) {
                        isArraySafe = false;
                        failedIndex = i;
                        break;
                    }
                }

                if (canSkip && !isArraySafe) {
                    // The problem is between the numbers at index or at index+1 so we remove them and try again
                    isArraySafe = isArrayIncreasingWithTolerance([...reports.slice(0, failedIndex), ...reports.slice(failedIndex + 1)], false);
                    if(!isArraySafe) {
                        failedIndex++;
                        isArraySafe = isArrayIncreasingWithTolerance([...reports.slice(0, failedIndex), ...reports.slice(failedIndex + 1)], false)
                    }
                }
                return isArraySafe;
            }
        });

        const solution = safeReportsCount;

        return { solution };
    },
}