import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partOne',
    async setup() {
        const regex = /(\d+): (.*)/g;
        const input = await GetInput(2024, 7);

        let total = 0;

        const matches = input.matchAll(regex);

        for (const match of matches) {
            const validationTotal = parseInt(match[1]);
            const numbers = match[2].split(' ').map(x => Number.parseInt(x));

            const maxPossibilities = Math.pow(2, numbers.length - 1);
            let isValid = false;

            // Try every combination possibilities
            for (let i = 0; i < maxPossibilities; ++i) {
                // Generate a binary array from the current attempt, example if we're trying the 9th possibility : [1, 0, 0, 1]
                // The digits will be used to determine which operation to try (0 is addition, 1 is multiplication)
                const binaryArray = Array.from(i.toString(2).padStart(numbers.length - 1, '0'), digit => parseInt(digit, 10));

                // Execute every operator sequence
                let operationTotal = numbers[0];
                for (let j = 0; j < numbers.length - 1; ++j) {
                    if (binaryArray[j] == 0) {
                        operationTotal += numbers[j + 1];
                    } else {
                        operationTotal *= numbers[j + 1];
                    }
                }

                if (operationTotal == validationTotal) {
                    isValid = true;
                    break;
                }
            }

            if (isValid) {
                total += validationTotal;
            }
        }

        const solution = total;

        return { solution };
    },
}