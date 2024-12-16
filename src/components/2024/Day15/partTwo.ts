import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partTwo',
    async setup() {
        const directionChars = ['^', '>', 'v', '<'];
        const directions: Vector2[] = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];
        const input = await GetInput(2024, 15);
        let total = 0;

        const inputSections = input.split("\r\n\r\n");

        const map = inputSections[0].replaceAll("#", "##").replaceAll(".", "..").replaceAll("O", "[]").replaceAll("@", "@.");

        const grid = map.split("\r\n").map(x => [...x]);

        const instructions: string[] = [...inputSections[1].replaceAll("\r\n", '')];

        let robotPosition = indexToVector(map.indexOf("@"), grid[0].length);

        instructions.forEach(instruction => {
            const direction = directions[directionChars.indexOf(instruction)];

            const [canMove, swaps] = tryMove(robotPosition, direction);

            if (canMove) {
                robotPosition = {
                    x: robotPosition.x + direction.x,
                    y: robotPosition.y + direction.y
                }

                let uniqueSwaps: { a: Vector2, b: Vector2 }[] = [];

                swaps.forEach(swap => {
                    if (!uniqueSwaps.some(x => JSON.stringify(x) == JSON.stringify(swap))) {
                        uniqueSwaps.push(swap);
                    }
                })

                uniqueSwaps = uniqueSwaps.sort((a, b) => {
                    if (direction.y == 0) {
                        if (a.b.x * direction.x > b.b.x * direction.x) {
                            return -1;
                        } else if (a.b.x * direction.x < b.b.x * direction.x) {
                            return 1;
                        } else {
                            return 0;
                        }
                    } else {
                        if (a.b.y * direction.y > b.b.y * direction.y) {
                            return -1;
                        } else if (a.b.y * direction.y < b.b.y * direction.y) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                });

                uniqueSwaps.forEach(swap => {
                    const temp = grid[swap.a.y][swap.a.x];
                    grid[swap.a.y][swap.a.x] = grid[swap.b.y][swap.b.x];
                    grid[swap.b.y][swap.b.x] = temp;
                });
            }

            function tryMove(currentPos: Vector2, direction: Vector2): [boolean, { a: Vector2, b: Vector2 }[]] {
                const targetPos = {
                    x: currentPos.x + direction.x,
                    y: currentPos.y + direction.y
                }

                const coordsToSwap: { a: Vector2, b: Vector2 }[] = [{ a: currentPos, b: targetPos }];

                switch (grid[targetPos.y][targetPos.x]) {
                    case '.':
                        return [true, coordsToSwap];
                    case '[':
                        if (direction.y == 0) {
                            const [canMove, swaps] = tryMove(targetPos, direction);
                            coordsToSwap.push(...swaps);
                            return [canMove, coordsToSwap];
                        } else {
                            const [canMoveA, swapsA] = tryMove(targetPos, direction);
                            const [canMoveB, swapsB] = tryMove({ x: targetPos.x + 1, y: targetPos.y }, direction);
                            coordsToSwap.push(...swapsA, ...swapsB);
                            return [canMoveA && canMoveB, coordsToSwap];
                        }
                    case ']':
                        if (direction.y == 0) {
                            const [canMove, swaps] = tryMove(targetPos, direction);
                            coordsToSwap.push(...swaps);
                            return [canMove, coordsToSwap];
                        } else {
                            const [canMoveA, swapsA] = tryMove(targetPos, direction);
                            const [canMoveB, swapsB] = tryMove({ x: targetPos.x - 1, y: targetPos.y }, direction);
                            coordsToSwap.push(...swapsA, ...swapsB);
                            return [canMoveA && canMoveB, coordsToSwap];
                        }
                    default:
                        return [false, []];
                }
            }
        });

        for (let row = 0; row < grid.length; ++row) {
            for (let col = 0; col < grid[0].length; ++col) {
                if (grid[row][col] == '[') {
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