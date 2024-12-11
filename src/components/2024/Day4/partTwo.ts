import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partTwo',
    async setup() {
        const wordToFind = "MAS";
        const input = await GetInput(2024, 4);
        const grid = input.split("\r\n");

        let total = 0;

        for (let row = 0; row < grid.length - wordToFind.length + 1; ++row) {
            for (let col = 0; col < grid[row].length - wordToFind.length + 1; ++col) {
                checkCross(row, col);
            }
        }

        function checkCross(row: number, col: number) {
            const maxY = row + wordToFind.length - 1;
            if (maxY < 0 || maxY >= grid.length) {
                return;
            }

            const maxX = col + wordToFind.length - 1;
            if (maxX < 0 || maxX >= grid[0].length) {
                return;
            }

            const firstDiagonal = checkWord(row, col, 1, 1);
            const secondDiagonal = checkWord(row, col + wordToFind.length - 1, -1, 1);


            if (firstDiagonal && secondDiagonal) {
                ++total;
            }
        }

        function checkWord(row: number, col: number, directionX: number, directionY: number): boolean {
            const currentChar = grid[row][col];

            let wordToCheck = wordToFind;
            if (currentChar != wordToCheck[0]) {
                wordToCheck = wordToFind.split('').reverse().join('');

                if (currentChar != wordToCheck[0]) {
                    return false;
                }
            }

            let wordFound = "";

            for (let i = 0; i < wordToCheck.length; ++i) {
                wordFound += grid[row + (i * directionY)][col + (i * directionX)];
            }

            return wordFound == wordToCheck
        }

        const solution = total;

        return { solution };
    },
}