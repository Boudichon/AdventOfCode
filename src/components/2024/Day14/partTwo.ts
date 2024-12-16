import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partTwo',
    async setup() {
        const regex = /(-?\d+),(-?\d+)/g
        const input = await GetInput(2024, 14);

        const gridWidth = 101;
        const gridHeight = 103;
        const secondsToPass = 10000;
        const densityRatio = 0.2;

        let frame = -1;

        for (let i = 0; i < secondsToPass; ++i) {
            const robots: Vector2[] = input.split("\r\n").map(robot => {
                const data = [...robot.matchAll(regex)];
                const initialPos: Vector2 = {
                    x: parseInt(data[0][1]),
                    y: parseInt(data[0][2])
                };
                const velocity: Vector2 = {
                    x: parseInt(data[1][1]),
                    y: parseInt(data[1][2])
                };

                return {
                    x: strictModulo(initialPos.x + (velocity.x * i), gridWidth),
                    y: strictModulo(initialPos.y + (velocity.y * i), gridHeight),
                }
            });

            const average: Vector2 = {
                x: Math.floor(robots.map(x => x.x).reduce((a, b) => a + b) / robots.length),
                y: Math.floor(robots.map(x => x.y).reduce((a, b) => a + b) / robots.length)
            };

            const topLeft: Vector2 = {
                x: average.x - Math.floor(gridWidth * densityRatio),
                y: average.y - Math.floor(gridHeight * densityRatio),
            }

            const bottomRight: Vector2 = {
                x: average.x + Math.floor(gridWidth * densityRatio),
                y: average.y + Math.floor(gridHeight * densityRatio),
            }

            const countInRange = robots.filter(robot => robot.x > topLeft.x && robot.x < bottomRight.x && robot.y > topLeft.y && robot.y < bottomRight.y).length;

            // If over 40% of the robots are within the same 40% square of the map, assume it's done the easter egg
            if (countInRange > (robots.length * 0.4)) {
                frame = i;
                break;
            }
        }

        function strictModulo(a: number, b: number) {
            return ((a % b) + b) % b;
        }

        const solution = frame;

        return { solution };
    },
}

interface Vector2 {
    x: number,
    y: number,
}