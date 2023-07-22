export type celValue<Type> = (Type | "");

export default class Puzzle<Type>{
    grid: celValue<Type>[][];
    rules?: ((grid: celValue<Type>[][]) => boolean)[];
    solution?: Type[][];

    constructor(values: celValue<Type>[][], rules?: ((grid: celValue<Type>[][]) => boolean)[], solution?: Type[][]){
        this.grid = values;
        this.rules = rules;
        this.solution = solution;
    }

    isSolved(): boolean {
        let solved = true;
        this.rules?.forEach(element => {
            // console.log(element, ": ", element(this.grid));
            // let result = element(this.grid);
            // if (!result) console.log(element, ": ", element(this.grid));
            solved = solved ? element(this.grid) : solved;        
        });

        // Add check against grid if no rules are supplied
        return solved;

    }
}