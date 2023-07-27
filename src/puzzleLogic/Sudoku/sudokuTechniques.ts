/* This file will contain a bunch of checks / techniques that can be used by the solvers.
    - Each function will accept a reference to a sudoku-grid as its first parameter.
    - This grid may not be changed.
    - Further information to tell where and how to apply the check / technique.
    - Sadly I'll follow sudokuconventions for labeling rows, colums and boxes.
    - This means columns, rows and boxes go from 1 to 9, left -> right, top -> bottem.
*/

import { getSudokuBox } from "../Scripts/helperFunctions";
import { isSet1to9 } from "../Scripts/sudokuRules";

// Basic completion checks for rows, columns and boxes;
export function checkRowComplete(grid: (number | "")[][], row: number): boolean {
    return isSet1to9(grid[row - 1]);
}
export function checkColComplete(grid: (number | "")[][], col: number): boolean {
    return isSet1to9(grid.map(row => row[col - 1]));
}
export function checkBoxComplete(grid: (number | "")[][], box: number): boolean {
    const boxArray = getSudokuBox(grid, box);
    return isSet1to9(boxArray);
}