import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partTwo',
    async setup() {
        const input = await GetInput(2024, 10);
        let total = 0;

        const gridWidth = input.split('\r\n')[0].length;
        const gridHeight = input.split('\r\n').length;

        const heads: Coord[] = [];

        const inlineGrid = [...input.replaceAll('\r\n', '')];

        inlineGrid.forEach((height, index) => {
            if (height == '0') {
                heads.push({
                    x: index % gridWidth,
                    y: Math.floor(index / gridWidth),
                });
            }
        });

        heads.forEach(x => {
            total += checkAdjacent(x);
        });

        function checkAdjacent(currentPos: Coord): number {
            const currentHeight = getHeightAtCoord(currentPos)!;

            if (currentHeight == 9) {
                return 1;
            }

            let total = 0;

            const leftPos = { x: currentPos.x - 1, y: currentPos.y };
            const upPos = { x: currentPos.x, y: currentPos.y - 1 };
            const rightPos = { x: currentPos.x + 1, y: currentPos.y };
            const downPos = { x: currentPos.x, y: currentPos.y + 1 };

            const adjacents: Coord[] = [leftPos, upPos, rightPos, downPos];

            adjacents.filter(x => currentHeight + 1 == (getHeightAtCoord(x) || 0)).forEach(nextPos => {
                total += checkAdjacent(nextPos);
            });

            return total;
        }

        function getHeightAtCoord(coord: Coord): number | null {
            if (coord.x < 0 || coord.x >= gridWidth || coord.y < 0 || coord.y >= gridHeight) {
                return null;
            }

            return Number.parseInt(inlineGrid[(coord.y * gridWidth) + coord.x]);
        }

        const solution = total;

        return { solution };
    },
}

interface Coord {
    x: number,
    y: number
}