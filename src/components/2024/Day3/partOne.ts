import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partOne',
    async setup() {
        const input = await GetInput(2024, 3);
        const regex = /mul\((\d+),(\d+)\)/g;
        
        let total = 0;

        let match;

        while ((match = regex.exec(input)) !== null) {
            const num1 = match[1];
            const num2 = match[2];
            total += Number.parseInt(num1) * Number.parseInt(num2);
        }

        const solution = total;

        return { solution };
    },
}