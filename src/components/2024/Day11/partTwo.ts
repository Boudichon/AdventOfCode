import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partTwo',
    async setup() {
        const maxDepth = 75;
        const input = await GetInput(2024, 11);
        const previous = new Map<string, number>();

        let total = input.split(" ").length;

        input.split(" ").forEach(x => {
            total += calculateStone(x, 0);
        });

        function calculateStone(stone: string, depth: number): number {
            const key = `${stone}-${depth}`;
            if (previous.has(key)) {
                return previous.get(key)!;
            }

            let splits = 0;

            let newValue = stone;
            if (stone == "0") {
                newValue = "1";
            } else if (stone.length % 2 === 0) {
                newValue = stone.substring(0, stone.length / 2) + " " + Number.parseInt(stone.substring(stone.length / 2));
                ++splits;
            } else {
                newValue = (Number.parseInt(stone) * 2024).toString();
            }

            if (depth + 1 < maxDepth) {
                newValue.split(" ").forEach(x => {
                    splits += calculateStone(x, depth + 1);
                })
            }

            previous.set(key, splits);

            return splits;
        }
        
        const solution = total;

        return { solution };
    },
}