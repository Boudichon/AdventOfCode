import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partOne',
    async setup() {
        const directionChars = ['^', '>', 'v', '<'];
        const directions: Vector2[] = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];
        const input = await GetInput(2024, 15);
        let total = 0;

        const inputSections = input.split("\r\n\r\n");

        const grid = inputSections[0].split("\r\n").map(x => [...x]);

        const instructions: string[] = [...inputSections[1].replaceAll("\r\n", '')];

        let robotPosition = indexToVector(inputSections[0].indexOf("@"), grid[0].length);

        instructions.forEach(instruction => {
            const direction = directions[directionChars.indexOf(instruction)];

            if (tryMove(robotPosition, direction)) {
                robotPosition = {
                    x: robotPosition.x + direction.x,
                    y: robotPosition.y + direction.y
                }
            }

            function tryMove(currentPos: Vector2, direction: Vector2): boolean {
                let canPush = false;
                const targetPos = {
                    x: currentPos.x + direction.x,
                    y: currentPos.y + direction.y
                }
                switch (grid[targetPos.y][targetPos.x]) {
                    case '.':
                        canPush = true;
                        break;
                    case 'O':
                        canPush = tryMove(targetPos, direction);
                        break;
                    default:
                        return false;
                }
                if (canPush) {
                    const temp = grid[currentPos.y][currentPos.x];
                    grid[currentPos.y][currentPos.x] = grid[targetPos.y][targetPos.x];
                    grid[targetPos.y][targetPos.x] = temp;
                }
                return canPush;
            }
        });

        for (let row = 0; row < grid.length; ++row) {
            for (let col = 0; col < grid[0].length; ++col) {
                if (grid[row][col] == 'O') {
                    total += 100 * row + col;
                }
            }
        }

        const solution = total;

        return { solution };
    },
}

interface Vector2 {
    x: number,
    y: number,
}

function indexToVector(index: number, width: number): Vector2 {
    return {
        x: index % (width + 2),
        y: Math.floor(index / (width + 2))
    }
}