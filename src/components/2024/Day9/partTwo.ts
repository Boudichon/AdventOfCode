import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partTwo',
    async setup() {
        const input = await GetInput(2024, 9);
        let total = 0;

        const spaces: Block[] = [...input].map((x, i) => {
            return {
                isUsed: i % 2 == 0,
                value: Math.floor(i / 2),
                size: Number.parseInt(x)
            };
        });

        for (let i = spaces.length - 1; i >= 0; --i) {
            const block = spaces[i];

            if (block.isUsed) {
                const freeIndex = spaces.findIndex(x => !x.isUsed && x.size >= block.size);

                if (freeIndex >= 0 && freeIndex < i) {
                    spaces[freeIndex].size -= block.size;
                    spaces.splice(i, 1, {
                        isUsed: false,
                        size: block.size,
                        value: -1 // It's unused so it doesn't matter
                    });
                    spaces.splice(freeIndex, 0, block);
                    i++;
                }
            }
        }

        let index = 0;
        spaces.forEach(x => {
            while (x.size > 0) {
                if (x.isUsed) {
                    total += index * x.value;
                }
                --x.size;
                index++;
            }
        });

        const solution = total;

        return { solution };
    },
}

interface Block {
    size: number,
    value: number,
    isUsed: boolean;
}