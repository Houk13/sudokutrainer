/* This file will contain a bunch of checks / techniques that can be used by the solvers.
    - Each function will accept a reference to a sudoku-grid as its first parameter.
    - This grid may not be changed.
    - Further information to tell where and how to apply the check / technique.
    - Sadly I'll follow sudokuconventions for labeling rows, colums and boxes.
    - This means columns, rows and boxes go from 1 to 9, left -> right, top -> bottem.
    - Where possible, this package uses functions from the sudokuHelper module to avoid 
        code repeating and improve degubability.
*/

import * as hf from "../Scripts/helperFunctions";
import * as sh from "../Scripts/sudokuHelper";

type celValue = (number | "");

// Basic completion checks for rows, columns and boxes;
export const checkRowComplete = (grid: celValue[][], row: number): boolean => {
    return sh.isSet1to9(grid[row - 1]);
}
export const checkColComplete = (grid: celValue[][], col: number): boolean => {
    return sh.isSet1to9(grid.map(row => row[col - 1]));
}
export const checkBoxComplete = (grid: celValue[][], box: number): boolean => {
    const boxArray = sh.getSudokuBox(grid, box);
    return sh.isSet1to9(boxArray);
}
/** returns 0 if the given cell is not a naked single, else it returns the value it has to be
 *  Can have optional optionGrid parameter.
 */
export const isNakedSingle = (grid: celValue[][], row: number, col: number, optionGrid?: number[][][]): number => {
    // just check the optiongrid if it is given.
    if (optionGrid) {
        return optionGrid[row][col].length === 1 ? optionGrid[row][col][0] : 0;
    } 
    let opts: number[] = sh.getDirectCelOptions(grid, row, col);
    return opts.length === 1 ? opts[0] : 0;
}

/** if there is exactly 1 cell remaining where "value" can be place in the given row 
 * that cells column number will be returned. Else the function returns 0;
 * UNIMPLEMENTED */
export const isHiddenSingleRow = (grid: celValue[][], row: number, value: number, optionGrid?: number[][][]): number => {
    hf.isUnimplemented("isHiddenSingleRow");
    return 0;
}
/** if there is exactly 1 cell remaining where "value" can be place in the given column 
 * that cells column number will be returned. Else the function returns 0;
 * UNIMPLEMENTED */
export const isHiddenSingleCol = (grid: celValue[][], col: number, value: number, optionGrid?: number[][][]): number => {
    hf.isUnimplemented("isHiddenSingleCol");
    return 0;
}
/** if there is exactly 1 cell remaining where "value" can be place in the given box
 * that cells column number will be returned. Else the function returns 0;
 * UNIMPLEMENTED */
export const isHiddenSingleBox = (grid: celValue[][], box: number, value: number, optionGrid?: number[][][]): number => {
    hf.isUnimplemented("isHiddenSingleBox");
    return 0;
}

