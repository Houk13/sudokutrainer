import { boolean } from "mathjs";
import Puzzle, { celValue } from "../Classes/Puzzle";
import { isSet1to9 } from "../Scripts/sudokuRules";
type gridType = Array<celValue<number>[]>

// const grid = new Array<celValue<number>[]>(9);
// for (let row = 0; row !== 9; ++row){
//     grid[row] = new Array<celValue<number>>(9).fill("");
// }

const grid: gridType = [[1, 2, 3, 4, 5, 6, 7, 8, 9], 
                        [4, 5, 6, 7, 8, 9, 1, 2, 3],
                        [7, 8, 9, 1, 2, 3, 4, 5, 6],
                        [2, 3, 4, 5, 6, 7, 8, 9, 1],
                        [5, 6, 7, 8, 9, 1, 2, 3, 4],
                        [8, 9, 1, 2, 3, 4, 5, 6, 7],
                        [3, 4, 5, 6, 7, 8, 9, 1, 2],
                        [6, 7, 8, 9, 1, 2, 3, 4, 5],
                        [9, 1, 2, 3, 4, 5, 6, 7, 8]];

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

let rules: ((grid: gridType) => boolean)[] = [];

for (let set = 0; set != 9; ++set) {
    rules.push((grid: gridType) => isSet1to9(grid[set]));
    rules.push((grid: gridType) => isSet1to9(grid.map(arr => arr[set])));
    rules.push((grid: gridType) => isSet1to9(getBox(grid, set)))
}


export const sudoku = new Puzzle(grid, rules);