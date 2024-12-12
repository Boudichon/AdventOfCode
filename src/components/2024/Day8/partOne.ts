import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partOne',
    async setup() {
        const input = await GetInput(2024, 8);
        const map: string[] = [...input.replaceAll("\r\n", '')];

        const gridWidth = input.split('\r\n')[0].length;
        const gridHeight = input.split('\r\n').length;

        const antennas: Antenna[] = [];
        const antinodes: Antenna[] = [];

        // extract every antennas
        map.forEach((char, index) => {
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

                const antinode: Antenna = {
                    symbol: antenna.symbol,
                    x: matchingAntenna.x + diffX,
                    y: matchingAntenna.y + diffY
                };

                if (antinode.x >= 0 && antinode.x < gridWidth && antinode.y >= 0 && antinode.y < gridHeight && !antinodes.some(x => x.x == antinode.x && x.y == antinode.y)) {
                    antinodes.push(antinode);
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