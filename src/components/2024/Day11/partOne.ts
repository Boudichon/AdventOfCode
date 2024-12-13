import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partOne',
    async setup() {
        const input = await GetInput(2024, 11);

        let stones = input;
        let subtotal = input.split(" ").length;
        for (let i = 1; i <= 25; ++i) {
            stones = stones.replaceAll(/(\d+)/g, match => {
                let newValue = match;
                if (match == "0") {
                    newValue = "1";
                } else if (match.length % 2 === 0) {
                    newValue = match.substring(0, match.length / 2) + " " + Number.parseInt(match.substring(match.length / 2));
                    ++subtotal;
                } else {
                    newValue = (Number.parseInt(match) * 2024).toString();
                }
                return newValue;
            });
        }

        const solution = subtotal;

        return { solution };
    },
}