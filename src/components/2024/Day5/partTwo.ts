import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partTwo',
    async setup() {
        const input = await GetInput(2024, 5);

        let total = 0;

        const sections = input.split("\r\n\r\n");
        const rules = sections[0].split("\r\n").map(x => {
            const numbers = x.split("|");
            return {
                firstPage: numbers[0],
                secondPage: numbers[1]
            };
        });

        const batches = sections[1].split("\r\n");

        batches.forEach(batch => {
            let isRowValid = true;
            rules.forEach(x => {
                const secondPage = batch.indexOf(x.secondPage);
                const firstPage = batch.indexOf(x.firstPage)

                if (secondPage >= 0 && firstPage >= 0 && secondPage < firstPage) {
                    isRowValid = false;
                }
            });

            if (!isRowValid) {
                const pages = batch.split(",").sort((a, b) => {
                    if (rules.some(x => x.firstPage == a && x.secondPage == b)) {
                        return -1;
                    } else if (rules.some(x => x.firstPage == b && x.secondPage == a)) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
                total += Number.parseInt(pages[Math.floor(pages.length / 2)]);
            }
        });

        const solution = total;

        return { solution };
    },
}