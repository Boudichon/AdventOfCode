import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partTwo',
    async setup() {
        const input = await GetInput(2024, 8);
        const inputString: string[] = [...input.replaceAll("\r\n", '')];

        const grid = input.split("\r\n").map(x => [...x]);
        const gridWidth = grid[0].length;
        const gridHeight = grid.length;

        const antennas: Antenna[] = [];
        const antinodes: Antenna[] = [];

        // extract every antennas
        inputString.forEach((char, index) => {
            if (char != '.') {
                antennas.push({
                    symbol: char,
                    x: index % gridWidth,
                    y: Math.floor(index / gridWidth),
                });
            }
        });

        antennas.forEach((antenna, index) => {
            antennas.filter((x, i) => x.symbol == antenna.symbol && i != index).forEach(matchingAntenna => {
                const diffX = matchingAntenna.x - antenna.x;
                const diffY = matchingAntenna.y - antenna.y;

                let antinode: Antenna = {
                    symbol: antenna.symbol,
                    x: matchingAntenna.x,
                    y: matchingAntenna.y
                };

                while (antinode.x >= 0 && antinode.x < gridWidth && antinode.y >= 0 && antinode.y < gridHeight) {
                    if (!antinodes.some(x => x.x == antinode.x && x.y == antinode.y)) {
                        antinodes.push(antinode);
                    }

                    antinode = {
                        symbol: antinode.symbol,
                        x: antinode.x + diffX,
                        y: antinode.y + diffY
                    };
                }
            });
        });

        const solution = antinodes.length;

        return { solution };
    },
}

interface Antenna {
    symbol: string,
    x: number,
    y: number,
}