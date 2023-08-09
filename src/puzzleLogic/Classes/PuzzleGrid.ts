type celValue<Type> = (Type | "");


export default class PuzzleGrid<Type>{
    grid: celValue<Type>[][];

    constructor(values: celValue<Type>[][]){
        this.grid = values;
    }

    private isWithinGrid(row: number, col: number): boolean {
        return !(row < 0 || row >= this.grid[0].length || col < 0 || col >= this.grid.length)
    }

    setVal(row: number, col: number, val: Type){
        if (this.isWithinGrid(row, col)){
            this.grid[row][col] = val;
        } else {
            throw("out of puzzle bounds");
        }
    }

    getVal(row: number, col: number): celValue<Type>{
        if (this.isWithinGrid(row, col)){
            return this.grid[row][col];
        } else {
            console.log("out of bounds", row, ",", col)
            return ""
            // throw("out of puzzle bounds");
        }
    }

    deleteVal(row: number, col:number) {
        if (this.isWithinGrid(row, col)){
            this.grid[row][col] = "";
        } else {
            console.log("out of bounds", row, ":", col)
            return ""
            // throw("out of puzzle bounds");
        }
    }

    getGrid(): celValue<Type>[][] {
        return this.grid;
    }
}