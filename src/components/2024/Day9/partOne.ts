import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partOne',
    async setup() {
        const input = await GetInput(2024, 9);
        let total = 0;

        const inputArray = [...input].filter((_, i) => i % 2 == 0).map(x => Number.parseInt(x));

        const spaceUsed = inputArray.reduce((a, b) => a + b, 0);

        let index = 0;

        for (let i = 0; i < input.length; ++i) {
            const number = Number.parseInt(input[i]);

            for (let j = 0; j < number; ++j) {
                if (i % 2 == 0) {
                    total += index * (i / 2);
                } else {
                    while (inputArray[inputArray.length - 1] == 0) {
                        inputArray.pop();
                    }
                    total += index * (inputArray.length - 1);

                    inputArray[inputArray.length - 1] = inputArray[inputArray.length - 1] - 1;
                }

                index++;
                if (index >= spaceUsed) break;
            }
            if (index >= spaceUsed) break;
        }

        const solution = total;

        return { solution };
    },
}