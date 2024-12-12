import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partTwo',
    async setup() {
        const obstacleChar = '#';
        const directionChars = ['^', '>', 'v', '<'];
        const input = await GetInput(2024, 6);

        let total = 0;

        const grid = input.split("\r\n").map(x => [...x]);

        // Init the grid;
        solveMaze(grid);

        for (let col = 0; col < grid.length; ++col) {
            console.log(col);
            for (let row = 0; row < grid[0].length; ++row) {
                if (grid[col][row] == 'X') {
                    const newGrid = input.split("\r\n").map(x => [...x]);
                    newGrid[col][row] = obstacleChar;

                    // console.log(col, row, newGrid);

                    const hasCausedLoop = solveMaze(newGrid);
        
                    if (hasCausedLoop) {
                        ++total;
                    }
                }
            }
        }

        function hasExitedMaze(x: number, y: number): boolean {
            return x < 0 || x >= grid[0].length || y < 0 || y >= grid.length;
        }

        function solveMaze(grid: string[][]): boolean {
            let currentDirectionIndex = 0;
            const pathTaken: { directionIndex: number; x: number; y: number; }[] = [];

            const playerIndex = input.indexOf(directionChars[currentDirectionIndex]);

            let playerX = playerIndex % (grid[0].length + 2);
            let playerY = Math.floor(playerIndex / (grid[0].length + 2));

            while (!hasExitedMaze(playerX, playerY)) {
                const directions = getDirection();

                const nextStepX = playerX + directions.directionX;
                const nextStepY = playerY + directions.directionY;

                const isExiting = hasExitedMaze(nextStepX, nextStepY);

                if (isExiting || grid[nextStepY][nextStepX] != obstacleChar) {
                    grid[playerY][playerX] = 'X';

                    if (pathTaken.some(x => x.x == playerX && x.y == playerY && x.directionIndex == currentDirectionIndex)) {
                        return true;
                    }

                    pathTaken.push({
                        directionIndex: currentDirectionIndex,
                        x: playerX,
                        y: playerY
                    });

                    if (!isExiting) {
                        grid[nextStepY][nextStepX] = directionChars[currentDirectionIndex];
                    }

                    playerX = nextStepX;
                    playerY = nextStepY;
                } else {
                    currentDirectionIndex = ++currentDirectionIndex % directionChars.length;

                    grid[playerY][playerX] = directionChars[currentDirectionIndex];
                }
            }

            return false;

            function getDirection() {
                let directionX = 0;
                let directionY = 0;

                switch (grid[playerY][playerX]) {
                    case directionChars[0]:
                        directionY = -1;
                        break;
                    case directionChars[1]:
                        directionX = 1;
                        break;
                    case directionChars[2]:
                        directionY = 1;
                        break;
                    case directionChars[3]:
                        directionX = -1;
                        break;
                }

                return { directionX, directionY };
            }
        }
        
        const solution = total;

        return { solution };
    },
}