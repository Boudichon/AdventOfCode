import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partTwo',
    async setup() {
        const values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
        const input = await GetInput(2023, 1);
        let total = 0;

        input.split("\r\n").forEach(row => {
            const digits = values.map(x => {
                return {
                    value: x,
                    firstIndex: row.indexOf(x),
                    lastIndex: row.lastIndexOf(x)
                };
            });

            const firstDigitIndex = values.indexOf(digits.sort((a,b) => a.firstIndex - b.firstIndex).filter(x => x.firstIndex >= 0)[0].value);
            const lastDigitIndex = values.indexOf(digits.sort((a,b) => b.lastIndex - a.lastIndex)[0].value);
            
            total += Number.parseInt(firstDigitIndex % 10 + "" + lastDigitIndex % 10);
        });

        const solution = total;

        return { solution };
    },
}