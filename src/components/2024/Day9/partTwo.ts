import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partTwo',
    async setup() {
        const input = await GetInput(2024, 9);
        let total = 0;

        const inputArray = [...input].filter((_, i) => i % 2 == 0).map(x => Number.parseInt(x));

        const spaceUsed = inputArray.reduce((a, b) => a + b, 0);

        let index = 0;
        const blocks: number[] = [];

        for (let i = 0; i < input.length; ++i) {
            const number = Number.parseInt(input[i]);

            for (let j = 0; j < number; ++j) {
                if (i % 2 == 0) {                    
                    blocks.push(i / 2);
                    total += index * (i / 2);
                } else {
                    while (inputArray[inputArray.length - 1] > number) {
                        inputArray.pop();
                    }
                    blocks.push(inputArray.length - 1);
                    total += index * (inputArray.length - 1);

                    inputArray[inputArray.length - 1] = inputArray[inputArray.length - 1] - 1;
                }

                index++;
                // if (index + 1 >= spaceUsed) break;
            }
            // console.log(blocks.join(''));
            // console.log("0099211177744333555566668888")
            // if (index + 1 >= spaceUsed) break;
        }

        const solution = total;

        return { solution };
    },
}