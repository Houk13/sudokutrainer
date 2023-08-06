type celValue<Type> = (Type | "");




export default class BasicPuzzle<Type>{
    grid: celValue<Type>[][];

    constructor(values: celValue<Type>[][]){
        this.grid = values;
    }

    isWithinGrid(x: number, y: number): boolean {
        return (x < 0 || x >= this.grid[0].length || y < 0 || y >= this.grid.length)
    }

    setVal(x: number, y: number, val: Type){
        if (this.isWithinGrid(x, y)){
            this.grid[x][y] = val;
        } else {
            throw("out of puzzle bounds");
        }
    }

    deleteVal(x: number, y:number) {
        if (this.isWithinGrid(x, y)){
            this.grid[x][y] = "";
        } else {
            throw("out of puzzle bounds");
        }
    }   
}