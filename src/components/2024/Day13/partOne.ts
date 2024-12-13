import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partOne',
    async setup() {
        const regex = /X[+=](\d+), Y[+=](\d+)/g
        const input = (await GetInput(2024, 13)).split("\r\n\r\n");

        let total = 0;

        /*
            A: 94 | 34
            B: 22 ! 67
            P: 8400 | 5400

            x: 94a + 22b = 8400
            y: 34a + 67b = 5400

            if you know a = 80
            x: (94 * 80) + 22b = 8400
            x: 22b = 8400 - (94 * 80)
            x: b = (8400 - (94 * 80)) / 22
            x: b = (8400 - 7520) / 22
            x: b = 880 / 22
            x: b = 40

            finding the number of press you need to make B work is X: b = (P.x - (A.x * ?)) / B.x

            loop through every possible a, check if b is possible.
            if both are possible, check if Y matches as well.
        */
        input.forEach(game => {
            const data = [...game.matchAll(regex)];

            const buttonA: Vector2 = {
                x: parseInt(data[0][1]),
                y: parseInt(data[0][2]),
            };

            const buttonB: Vector2 = {
                x: parseInt(data[1][1]),
                y: parseInt(data[1][2]),
            };

            const prize: Vector2 = {
                x: parseInt(data[2][1]),
                y: parseInt(data[2][2]),
            }

            const maxTriesX = Math.min(100, Math.ceil(prize.x / buttonA.x));

            let cheapestCost = -1;

            for (let i = 1; i <= maxTriesX; ++i) {
                // b = (P.x - (A.x * {possibleA})) / B.x
                const nbPressB = (prize.x - (buttonA.x * i)) / buttonB.x;

                // Check if the number of press is valid
                if (nbPressB % 1 == 0 && nbPressB <= 100) {
                    // y: (A.y * {possibleA}) + (B.y * {nbPressB}) = P.y
                    const worksWithY = (buttonA.y * i) + (buttonB.y * nbPressB) == prize.y;

                    if (worksWithY) {
                        const cost = (3 * i) + nbPressB;

                        if (cheapestCost < 0) {
                            cheapestCost = cost;
                        } else {
                            cheapestCost = Math.min(cheapestCost, cost);
                        }
                    }
                }
            }

            if (cheapestCost >= 0) {
                total += cheapestCost;
            }
        });

        const solution = total;

        return { solution };
    },
}

interface Vector2 {
    x: number,
    y: number,
}