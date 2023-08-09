import Puzzle, { celValue } from "../Classes/Puzzle";
import PuzzleGrid from "../Classes/PuzzleGrid";
import { isSet1to9 } from "../Scripts/sudokuHelper";
type gridType = Array<celValue<number>[]>

// const grid = new Array<celValue<number>[]>(9);
// for (let row = 0; row !== 9; ++row){
//     grid[row] = new Array<celValue<number>>(9).fill("");
// }

const fullGrid: gridType = [[1, 2, 3, 4, 5, 6, 7, 8, 9], 
                        [4, 5, 6, 7, 8, 9, 1, 2, 3],
                        [7, 8, 9, 1, 2, 3, 4, 5, 6],
                        [2, 3, 4, 5, 6, 7, 8, 9, 1],
                        [5, 6, 7, 8, 9, 1, 2, 3, 4],
                        [8, 9, 1, 2, 3, 4, 5, 6, 7],
                        [3, 4, 5, 6, 7, 8, 9, 1, 2],
                        [6, 7, 8, 9, 1, 2, 3, 4, 5],
                        [9, 1, 2, 3, 4, 5, 6, 7, 8]];

const grid: gridType = 
                        [["", "", "", 7 , "", 1 , "", "", ""],
                         [7 , 3 , "", "", 9 , "", "", "", 2 ],
                         [5 , 6 , 1 , "", "", "", 4 , 9 , ""],
                         [4 , 7 , 2 , 3 , 1 , 8 , "", "", ""],
                         ["", "", "", 5 , "", 9 , "", "", ""],
                         ["", "", "", 4 , 6 , 7 , 2 , 8 , 3 ],
                         ["", 4 , 6 , "", "", "", 1 , 5 , 9 ],
                         [2 , "", "", "", 3 , "", "", 7 , 4 ],
                         ["", "", "", 1 , "", 5 , "", "", ""]];

let getBox = (grid: gridType, boxnum: number): celValue<number>[] => {
    let firstRow = 3 * Math.floor(boxnum / 3);
    let firstCol = 3 * ((boxnum + 3) % 3);
    // console.log(firstRow, firstCol, ", " ,[...grid[firstRow].slice(firstCol, firstCol + 3)
    // , ...grid[firstRow + 1].slice(firstCol, firstCol + 3)
    // , ...grid[firstRow + 2].slice(firstCol, firstCol + 3)]);
    return [...grid[firstRow].slice(firstCol, firstCol + 3)
            , ...grid[firstRow + 1].slice(firstCol, firstCol + 3)
            , ...grid[firstRow + 2].slice(firstCol, firstCol + 3)];
}

let rules: ((puzzle: Puzzle<number>) => boolean)[] = [];

for (let set = 0; set !== 9; ++set) {
    rules.push((puzzle: Puzzle<number>) => isSet1to9(puzzle.puzzleGrid.grid.map(arr => arr[set])));
    rules.push((puzzle: Puzzle<number>) => isSet1to9(puzzle.puzzleGrid.grid[set]));
    rules.push((puzzle: Puzzle<number>) => isSet1to9(getBox(puzzle.puzzleGrid.grid, set)))
}


export const sudoku = new Puzzle(new PuzzleGrid(grid), rules);