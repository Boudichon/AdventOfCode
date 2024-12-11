import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partOne',
    async setup() {
        const colors = ["red", "green", "blue"];
        const maxColors = [12, 13, 14];
        const input = await GetInput(2023, 2);
        let total = 0;

        input.split("\r\n").forEach((row, index) => {
            let isValid = true;
            const dataIndex = row.indexOf(": ") + 2;
            const games = row.substring(dataIndex).split("; ");

            games.forEach(game => {
                const pulls = game.split(", ").map(pull => {
                    const details = pull.split(" ");
                    return {
                        count: Number.parseInt(details[0]),
                        color: details[1],
                    }
                });

                pulls.forEach(pull => {
                    const pullIndex = colors.indexOf(pull.color);
                    if(pull.count > maxColors[pullIndex]) {
                        isValid = false;
                    }
                });
            });

            if (isValid) {
                total += index + 1;
            }
        });

        const solution = total;

        return { solution };
    },
}