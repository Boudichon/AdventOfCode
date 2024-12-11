import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partTwo',
    async setup() {
        const colors = ["red", "green", "blue"];
        const input = await GetInput(2023, 2);

        let total = 0;

        input.split("\r\n").forEach(row => {
            const colorsCounts = [0, 0, 0];
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
                    colorsCounts[pullIndex] = Math.max(colorsCounts[pullIndex], pull.count);
                });
            });
            total += colorsCounts[0] * colorsCounts[1] * colorsCounts[2];
        });

        const solution = total;

        return { solution };
    },
}