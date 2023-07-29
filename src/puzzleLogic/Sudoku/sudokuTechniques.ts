/* This file will contain a bunch of checks / techniques that can be used by the solvers.
    - Each function will accept a reference to a sudoku-grid as its first parameter.
    - This grid may not be changed.
    - Further information to tell where and how to apply the check / technique.
    - Sadly I'll follow sudokuconventions for labeling rows, colums and boxes.
    - This means columns, rows and boxes go from 1 to 9, left -> right, top -> bottem.
    - Where possible, this package uses functions from the sudokuHelper module to avoid 
        code repeating and improve degubability.
*/

import * as sh from "../Scripts/sudokuHelper";

type celValue = (number | "");

// Basic completion checks for rows, columns and boxes;
export function checkRowComplete(grid: celValue[][], row: number): boolean {
    return sh.isSet1to9(grid[row - 1]);
}
export function checkColComplete(grid: celValue[][], col: number): boolean {
    return sh.isSet1to9(grid.map(row => row[col - 1]));
}
export function checkBoxComplete(grid: celValue[][], box: number): boolean {
    const boxArray = sh.getSudokuBox(grid, box);
    return sh.isSet1to9(boxArray);
}
