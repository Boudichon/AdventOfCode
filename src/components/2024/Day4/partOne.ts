import { GetInput } from "@/helpers/inputGetter";

export default {
    name: 'partOne',
    async setup() {
        const wordToFind = "XMAS";
        const input = await GetInput(2024, 4);
        const grid = input.split("\r\n");

        let total = 0;

        for (let row = 0; row < grid.length; ++row) {
            for (let col = 0; col < grid[row].length; ++col) {
                checkWord(row, col, 1, 0);
                checkWord(row, col, 1, 1);
                checkWord(row, col, 0, 1);
                checkWord(row, col, -1, 1);
            }
        }

        function checkWord(row: number, col: number, directionX: number, directionY: number) {
            const currentChar = grid[row][col];

            let wordToCheck = wordToFind;
            if (currentChar != wordToCheck[0]) {
                wordToCheck = wordToFind.split('').reverse().join('');

                if (currentChar != wordToCheck[0]) {
                    return;
                }
            }

            const maxY = row + (directionY * (wordToCheck.length - 1));
            if (maxY < 0 || maxY >= grid.length) {
                return;
            }

            const maxX = col + (directionX * (wordToCheck.length - 1));
            if (maxX < 0 || maxX >= grid[0].length) {
                return;
            }

            let wordFound = "";

            for (let i = 0; i < wordToCheck.length; ++i) {
                wordFound += grid[row + (i * directionY)][col + (i * directionX)];
            }
            
            if (wordFound == wordToCheck) {
                total++;
            }
        }

        const solution = total;

        return { solution };
    },
}