/*
 * Backtracking is the main logic of this js file as it is the most 
 * used technique to make the sudoku solver.
 * 
 * WHAT IS BACKTRACKING?(my own words)
 *  It involves making choices at each step and backtracking if a chosen path
 *  does not lead to a solution. In Sudoku solving, it's used to try different
 *  numbers in empty cells, ensuring they adhere to Sudoku rules, and backtrack 
 * when a dead end is reached. It efficiently prunes the search space, 
 * finding solutions through trial and error.
 * 
 * 
 * 
 * CREATED BY: KUSH PATEL
 * GITHUB: github.com/kush-7k
 * 
 */


document.addEventListener("DOMContentLoaded", function() {
    const table = document.querySelector("table");
    const cells = Array.from(document.querySelectorAll("td"));

    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            clearHighlight();
            cell.classList.add("highlight");
        });

        cell.addEventListener("input", () => {
            const value = parseInt(cell.innerText);
            if (isNaN(value) || value < 1 || value > 9) {
                cell.innerText = "";
            }
        });
    });

    function clearHighlight() {
        cells.forEach(cell => {
            cell.classList.remove("highlight");
        });
    }

    function solveSudoku() {
        const grid = getGrid();
        if (solve(grid)) {
            updateGrid(grid);
        } else {
            alert("No solution exists for this Sudoku puzzle!");
        }
    }

    function generateSudoku(difficulty) {
        clearGrid();

        const solvedGrid = [];
        for (let i = 0; i < 9; i++) {
            const row = [];
            for (let j = 0; j < 9; j++) {
                row.push(0);
            }
            solvedGrid.push(row);
        }
        solve(solvedGrid);

        let numberOfClues;
        switch (difficulty) {
            case "easy":
                numberOfClues = Math.floor(Math.random() * 10) + 40;
                break;
            case "medium":
                numberOfClues = Math.floor(Math.random() * 10) + 30;
                break;
            case "hard":
                numberOfClues = Math.floor(Math.random() * 10) + 25;
                break;
            case "very-hard":
                numberOfClues = Math.floor(Math.random() * 10) + 20;
                break;
            case "impossible":
                numberOfClues = Math.floor(Math.random() * 10) + 15;
                break;
            default:
                numberOfClues = Math.floor(Math.random() * 10) + 30;
        }

        for (let i = 0; i < numberOfClues; i++) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            solvedGrid[row][col] = 0;
        }

        updateGrid(solvedGrid);
    }

    function getGrid() {
        const grid = [];
        for (let i = 0; i < 9; i++) {
            const row = [];
            for (let j = 0; j < 9; j++) {
                const cell = cells[i * 9 + j];
                const value = cell.innerText.trim();
                row.push(value === "" ? 0 : parseInt(value));
            }
            grid.push(row);
        }
        return grid;
    }

    function updateGrid(grid) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                cells[i * 9 + j].innerText = grid[i][j] === 0 ? "" : grid[i][j];
            }
        }
    }

    function clearGrid() {
        cells.forEach(cell => {
            cell.innerText = "";
        });
    }

    function isSafe(grid, row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (grid[row][i] === num || grid[i][col] === num) {
                return false;
            }
        }

        const startRow = row - (row % 3);
        const startCol = col - (col % 3);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[startRow + i][startCol + j] === num) {
                    return false;
                }
            }
        }

        return true;
    }
/**
 * Recursive function to solve the Sudoku puzzle using backtracking.
 * @param {number[][]} grid - The Sudoku grid to solve.
 * @returns {boolean} - True if a solution is found, false otherwise.
 */
    function solve(grid) {
        let row = -1;
        let col = -1;
        let isEmpty = true;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (grid[i][j] === 0) {
                    row = i;
                    col = j;
                    isEmpty = false;
                    break;
                }
            }
            if (!isEmpty) {
                break;
            }
        }

        if (isEmpty) {
            return true;
        }

        for (let num = 1; num <= 9; num++) {
            if (isSafe(grid, row, col, num)) {
                grid[row][col] = num;
                if (solve(grid)) {
                    return true;
                }
                grid[row][col] = 0;
            }
        }

        return false;//It returns false when no solution has found and hence it repeats the process until it has been solved
    }

    document.getElementById("solve-btn").addEventListener("click", solveSudoku);

    document.getElementById("easy-btn").addEventListener("click", function() {
        generateSudoku("easy");
    });

    document.getElementById("medium-btn").addEventListener("click", function() {
        generateSudoku("medium");
    });

    document.getElementById("hard-btn").addEventListener("click", function() {
        generateSudoku("hard");
    });

    document.getElementById("very-hard-btn").addEventListener("click", function() {
        generateSudoku("very-hard");
    });

    document.getElementById("impossible-btn").addEventListener("click", function() {
        generateSudoku("impossible");
    });

    document.getElementById("import-btn").addEventListener("click", function() {
        clearGrid();
    });
});
