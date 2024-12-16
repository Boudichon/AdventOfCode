import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partOne',
    async setup() {
        const regex = /(-?\d+),(-?\d+)/g
        const input = await GetInput(2024, 14);

        const gridWidth = 101;
        const gridHeight = 103;
        const secondsToPass = 100;

        const middleGridIndex: Vector2 = {
            x: Math.floor(gridWidth / 2),
            y: Math.floor(gridHeight / 2),
        }

        const quadrants = [0, 0, 0, 0];

        input.split("\r\n").forEach(robot => {
            const data = [...robot.matchAll(regex)];
            const initialPos: Vector2 = {
                x: parseInt(data[0][1]),
                y: parseInt(data[0][2])
            };
            const velocity: Vector2 = {
                x: parseInt(data[1][1]),
                y: parseInt(data[1][2])
            };

            const newPos: Vector2 = {
                x: strictModulo(initialPos.x + (velocity.x * secondsToPass), gridWidth),
                y: strictModulo(initialPos.y + (velocity.y * secondsToPass), gridHeight),
            }

            if(newPos.x < middleGridIndex.x && newPos.y < middleGridIndex.y) quadrants[0]++;
            if(newPos.x > middleGridIndex.x && newPos.y < middleGridIndex.y) quadrants[1]++;
            if(newPos.x > middleGridIndex.x && newPos.y > middleGridIndex.y) quadrants[2]++;
            if(newPos.x < middleGridIndex.x && newPos.y > middleGridIndex.y) quadrants[3]++;
        });

        function strictModulo(a: number, b: number) {
            return ((a % b) + b) % b;
        }

        const solution = quadrants.reduce((a,b) => a * b);

        return { solution };
    },
}

interface Vector2 {
    x: number,
    y: number,
}