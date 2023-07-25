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

// returns an object that can be used to show a quick sudoku scan puzzle
export function generateQuickSudokuScan() {
    const arr: (number | "")[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const unknownIndex = randomInt(1, 10);
    shuffle(arr);
    const answer = arr[unknownIndex];
    arr[unknownIndex] = "";
    return {array: arr, index: unknownIndex + 1, answer};
}

// generates new quickscan puzzles
export default function quickSudokuScanGenerator() {
    return () => {
        return generateQuickSudokuScan();
    }
}