import { randomInt } from "mathjs";

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

// generates new quickscan puzzles
export default function quickScanSudokuGenerator() {
    return () => {
        return generateQuickScanSudoku();
    }
}