import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partTwo',
    async setup() {
        const cleaningRegex = /don't\(\).*?do\(\)/g;
        const regex = /mul\((\d+),(\d+)\)/g;
        
        let input = (await GetInput(2024, 3)).replaceAll("\r\n", '').replaceAll(cleaningRegex, '');
        const lastDontIndex = input.lastIndexOf("don't()");
        input = input.slice(0, lastDontIndex);

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