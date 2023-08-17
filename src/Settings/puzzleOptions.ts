export interface PuzzleStyles{puzzle: string, styles: string[]}

export const SudokuStyles: PuzzleStyles = {
    puzzle: "Sudoku",
    styles: ["Classic", "QuickScan", "Techniques"]
}

const puzzleOptionCollection: Map<string, PuzzleStyles> = new Map<string, PuzzleStyles>()
puzzleOptionCollection.set("Sudoku", SudokuStyles);
puzzleOptionCollection.set("Default", SudokuStyles);
puzzleOptionCollection.set("Free", SudokuStyles);

export const PuzzleOptions: Map<string, PuzzleStyles> = puzzleOptionCollection;

export function toMapKeyArray<T>(puzzleOptions: Map<string, T>): string[] {
    let keyArr: string[] = []
    puzzleOptions.forEach((val, key) => keyArr.push(key));
    return keyArr;
}