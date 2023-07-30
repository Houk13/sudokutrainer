/* This file containt a lot of functions useful for answering 
    questions about a sudoku grid. Many of these only work for 9x9 
    so they should be generalized and put into the "helperFunctions.ts" file
    Then the functions in this file can be specific versions of the 
    functions in that file.
*/
// Where possible, use the existing helper functions.
import * as hf from "./helperFunctions"; 
// 
export type celValue = (number | "");

/** checks whether the given array is a complete and unique set of the number 1 to 9 */
export const isSet1to9 = (set: (number | "")[]): boolean => hf.isSetNtoM(set, 9);

// -------------Selection functions for sudoku
/** determines the boxnumber based on the given row and column (count 1 to 9) */
export const getBoxNum = (row: number, col: number): number => {
    let lr = Math.floor((col - 1) / 3);
    let tb = Math.floor((row - 1) / 3);
    return (3 * tb) + lr + 1;
}
/** returns an array with the values in the given box */
export const getSudokuBox = (grid: celValue[][], box: number): celValue[] => {
    const boxArray: celValue[] = [];
        const startRow = 3 * Math.floor(box / 3);
        const startCol = 3 * ((box - 1) % 3);
        for (let row = startRow; row !== startRow + 3; row++){
            for (let col = startCol; col !== startCol + 3; row++){
                boxArray.push(grid[row][col]);
            }
        }
    return boxArray;
}
/** returns an array with the values in the given row */
export const getSudokuRow = (grid: celValue[][], row: number): celValue[] => {
    return grid[row];
}
/** returns an array with the values in the given column */
export const getSudokuCol = (grid: celValue[][], col: number): celValue[] => {
    return grid.map(row => row[col - 1]);
}
/** returns the highest repeated number, or 0 if there are no repeats */
export const hasRepeatedNumber = (arr: celValue[]): number => {
    const lib = new Array(9).fill(0);
    let double = 0;
    arr.forEach(val => {
        if (val === "") return;
        if (lib[val]){
            double = val;
        } else {
            lib[val] = 1;
        }
    })
    return double;
}
/** counts which values are present in the given array, returns an array of length 9 */
export const getValueCount = (arr: celValue[]): number[] => {
    const lib = new Array(9).fill(0);
    arr.forEach(val => {
        if (val === "") return;
        lib[val]++;
    })
    return lib;
}
/** returns an array of the values not used yet in the given row (can be empty) */
export const getDirectRowOptions = (grid: celValue[][], row: number): number[] => {
    const lib = getValueCount(getSudokuRow(grid, row));
    const options = [];
    for (let opt = 1; opt !== 10; opt++) {
        if (lib[opt] === 0) {
            options.push(opt);
        }
    }
    return options;
}
/** returns an array of the values not used yet in the given column (can be empty) */
export const getDirectColOptions = (grid: celValue[][], col: number): number[] => {
    const lib = getValueCount(getSudokuCol(grid, col));
    const options = [];
    for (let opt = 1; opt !== 10; opt++) {
        if (lib[opt] === 0) {
            options.push(opt);
        }
    }
    return options;
}
/** returns an array of the values not used yet in the given box (can be empty) */
export const getDirectBoxOptions = (grid: celValue[][], box: number): number[] => {
    const lib = getValueCount(getSudokuRow(grid, box));
    const options = [];
    for (let opt = 1; opt !== 10; opt++) {
        if (lib[opt] === 0) {
            options.push(opt);
        }
    }
    return options;
}
/** checks the row, column and box and returns an array of values that aren't present yet. */
export const getDirectCelOptions = (grid: celValue[][], row: number, col: number): number[] => {
    const rowOpts = getDirectRowOptions(grid, row);
    const colOpts = getDirectColOptions(grid, col);
    const boxOpts = getDirectBoxOptions(grid, getBoxNum(row, col));
    // cel options need to be in all three optionlists;
    const lib = new Array(9).fill(0);
    const celOpts = [];
    for (let opt in rowOpts){lib[opt]++}
    for (let opt in colOpts){lib[opt]++}
    for (let opt in boxOpts){lib[opt]++}
    for (let opt = 1; opt !== 10; opt++){
        if (lib[opt] === 3) celOpts.push(opt);
    }
    return celOpts;
}
/** creates a grid where each cel is filled with the values that cannot 
 * be seen directlyfrom that cell 
 * INEFFICIENT!!!
*/
export const getDirectOptionGrid = (grid: celValue[][]): number[][][] => {
    const optGrid: number[][][] = new Array(9);
    for (let rownum: number = 0; rownum !== 9; rownum++){
        let row = new Array(9);
        for (let colnum: number = 0; colnum !== 9; colnum++){
            row[colnum] = getDirectCelOptions(grid, rownum, colnum);
        }
        optGrid[rownum] = row;
    }
    return optGrid;
}
/**  creates a grid like directoptions, but instead of the options for each cell
 *   it lists the options for each digit in that row. 
 *      So if rowOpt[row1][4] is [3, 4, 7], that means that in 
 *      row 1, the number 4 can go in column 3, 4 or 7
 *  UNIMPLEMENTED
*/
export function getRowOptionGrid(grid: celValue[][]): number[][][] {
    hf.isUnimplemented("getRowOptionGrid");
    return [[[]]];
}
export function getColOptionGrid(grid: celValue[][]): number[][][] {
    hf.isUnimplemented("getColOptionGrid");
    return [[[]]];
}
export function getBoxOptionGrid(grid: celValue[][]): number[][][] {
    hf.isUnimplemented("getBoxOptionGrid");
    return [[[]]];
}