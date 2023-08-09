import PuzzleGrid from "./PuzzleGrid";
export type celValue<Type> = (Type | "");


export default class Puzzle<Type>{
    baseGrid: PuzzleGrid<Type>;
    puzzleGrid: PuzzleGrid<Type>;
    rules?: ((puzzle: Puzzle<Type>) => boolean)[];
    answer?: celValue<Type>;
    solutionGrid?: PuzzleGrid<Type>;

    constructor(grid: PuzzleGrid<Type>, rules?: ((puzzle: Puzzle<Type>) => boolean)[], answer?: celValue<Type>, solution?: PuzzleGrid<Type>){
        this.baseGrid = grid;
        let gridCopy = JSON.parse(JSON.stringify(grid.grid)); // create a copy for editing
        this.puzzleGrid = new PuzzleGrid(gridCopy);
        this.rules = rules;
        this.answer = answer;
        this.solutionGrid = solution;
    }

    setVal(x: number, y: number, val: Type){
        this.puzzleGrid.setVal(x, y, val);
    }

    getVal(x: number, y: number): celValue<Type>{
        return this.puzzleGrid.getVal(x, y);
    }

    getPuzzleGrid(): celValue<Type>[][] {
        return this.puzzleGrid.getGrid();
    }

    isSolved(): boolean {
        let solved = true;
        // Apply each rule to the grid, skip if already false;
        this.rules?.forEach(ruleFunction => {
            solved = solved ? ruleFunction(this) : solved;        
        });
        
        // Add comparison with solutionGrid if it exists
        return solved;
    }
}