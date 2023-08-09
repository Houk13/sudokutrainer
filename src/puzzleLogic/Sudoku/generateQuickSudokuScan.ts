import { randomInt } from "mathjs";
import PuzzleGrid from "../Classes/PuzzleGrid";
import Puzzle from "../Classes/Puzzle";
import { celValue } from "../Classes/Puzzle";
import * as sh from "../Scripts/sudokuHelper"

type regiontype = "row" | "col" | "box";

function shuffle(array: any[]) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

export interface QuickSudokuScan{
  values: (number | "")[];
  index: number;
  answer: number;
  type?: "row" | "col" | "box";
}
// returns an object that can be used to show a quick sudoku scan puzzle
export function generateQuickScanSudoku() {
    const arr: (number | "")[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const unknownIndex = randomInt(0, 9);
    shuffle(arr);
    const answer = arr[unknownIndex];
    arr[unknownIndex] = "";
    return {values: arr, index: unknownIndex, answer} as QuickSudokuScan;
}

// returns a sudokuGrid where 1 row/box/column is almost filled to form a quick scan puzzle
export function generateQuickScanSudokuPuzzle(type: regiontype| "any" = "any"): [Puzzle<number>, [number, number], number] {
    const toCoord = (type: regiontype, regionNum: number, idx: number): [number, number] => {
      return (type === "row") ? [regionNum - 1, idx] :
            (type === "col") ? [idx, regionNum - 1] : 
            sh.toBoxCoordinate(regionNum - 1, idx);
    }
    
    // Create empty grid
    let sudokugrid: celValue<number>[][] = [];
    for (let row = 0; row !== 9; row++){
      let rowCells: celValue<number>[] = [];
      for (let col = 0; col !== 9; col++){
        rowCells.push("");
      }
      sudokugrid.push(rowCells);
    }
    
    const quickScan = generateQuickScanSudoku();
    type = type === "any" ? ["row", "col", "box"][randomInt(0,3)] as regiontype: type;
    // random region 
    const regionNum = randomInt(1, 10); //sudokuNumbers
    let solCoord: [number, number] = toCoord(type, regionNum, quickScan.index);               
    // input the quickScan values
    for (let idx = 0; idx !== sh.SUDOKUSIZE; idx++){
      let coords = toCoord(type, regionNum, idx);
      sudokugrid[coords[0]][coords[1]] = quickScan.values[idx];
    }

    const checkSolution = (puzz: Puzzle<number>) => (puzz.puzzleGrid.getVal(solCoord[0], solCoord[1]) == quickScan.answer);
    let puzzle = new Puzzle<number>(new PuzzleGrid<number>(sudokugrid), [checkSolution], quickScan.answer);
    return [puzzle, toCoord(type, regionNum, quickScan.index), quickScan.answer];
}