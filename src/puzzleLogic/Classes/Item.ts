import {Options} from "./Options";

/**
 *  A BasicItem is a part of the puzzle that has a listable number of options.
 *  ex. position of the 5 in row 1 of a sudoku, name of the pentomino a shaded cell is part of, etc.
 */
export default class BasicItem<Type>{
    itemType: String;
    options: Options<Type>;
    nOptions: number;
    value: Type | undefined;
    constructor(type: String, options: Options<Type>, nOptions?: number, value?: Type){
        this.itemType = type;
        this.options = options;
        this.nOptions = options.size;
        this.value = value;
    }

    setValue(newValue: Type): void {
        this.value = newValue;
    }

    getValue(): Type | undefined {
        return this.value
    }

    hasOption(option: Type){
        return this.options.get(option);
    }

    removeOption(option: Type){
        if (this.options.get(option)){
            this.nOptions -= 1;
            this.options.set(option, false);
        }
    }
    
    addOption(option: Type){
        if (!this.options.get(option)){
            this.nOptions += 1;
            this.options.set(option, true);
        }
    }
}