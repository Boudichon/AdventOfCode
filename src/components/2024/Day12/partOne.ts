import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partOne',
    async setup() {
        const input = await GetInput(2024, 12);

        const groups: Group[] = [];
        let total = 0;

        const grid = input.split("\r\n").map(x => [...x]);

        for (let row = 0; row < grid.length; ++row) {
            for (let col = 0; col < grid[0].length; ++col) {
                const currentPlant = {
                    x: col,
                    y: row
                };

                const adjacentGroups = groups.filter(x => x.type == grid[row][col] && x.plants.some(plant => isAdjacent(currentPlant, plant)));

                if (adjacentGroups.length == 1) {
                    adjacentGroups[0].plants.push(currentPlant);
                } else if (adjacentGroups.length < 1) {
                    groups.push({
                        type: grid[row][col],
                        plants: [currentPlant]
                    });
                } else {
                    adjacentGroups[0].plants.push(...(adjacentGroups[1].plants), currentPlant);
                    groups.splice(groups.indexOf(adjacentGroups[1]), 1);
                }
            }
        }

        groups.forEach(group => {
            const area = group.plants.length;
            const perimeter = group.plants.map(currentPlant => 4 - group.plants.filter(plant => isAdjacent(currentPlant, plant)).length).reduce((a, b) => a + b);
            total += area * perimeter;
        });

        function isAdjacent(plantA: Plant, plantB: Plant): boolean {
            return (plantA.x == plantB.x && Math.abs(plantA.y - plantB.y) == 1) || (plantA.y == plantB.y && Math.abs(plantA.x - plantB.x) == 1);
        }

        const solution = total;

        return { solution };
    },
}

interface Plant {
    x: number,
    y: number
}

interface Group {
    type: string,
    plants: Plant[]
}