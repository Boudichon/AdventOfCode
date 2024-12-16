import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partTwo',
    async setup() {
        const input = await GetInput(2024, 14);

        const solution = 0;

        return { solution };
    },
}

interface Vector2 {
    x: number,
    y: number,
}