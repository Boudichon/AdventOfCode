import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partTwo',
    async setup() {
        const obstacleChar = '#';
        const directionChars = ['^', '>', 'v', '<'];
        const input = await GetInput(2024, 6);

        let total = 0;

        const grid = input.split("\r\n").map(x => [...x]);

        let currentDirectionIndex = 0;

        const pathTaken = [];

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

        function hasExitedMaze(x: number, y: number): boolean {
            return x < 0 || x >= grid[0].length || y < 0 || y >= grid.length;
        }

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

        // Join the grid into a single string and count the occurences of X
        total = grid.map(x => x.join("")).join("\r\n").split('X').length - 1;
        const solution = total;

        return { solution };
    },
}