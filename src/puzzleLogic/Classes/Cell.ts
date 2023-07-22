import {Options} from "./Options";

export default class Cell<Type>{
    cellType: String;
    options: Options<Type>;
    nOptions: number;
    value: Type | undefined;
    constructor(type: String, options: Options<Type>, nOptions?: number, value?: Type){
        this.cellType = type;
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