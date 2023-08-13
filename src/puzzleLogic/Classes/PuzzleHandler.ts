import { isAlphaNumeric } from "../../Components/PuzzleArea/inputHandlers";
import { InputType, getKeyboardInputType } from "../../UILogic/PuzzleInputHandler";
import Selection, { defaultSelectionKeyHandler, keyDirection } from "../../UILogic/Selection";
import Puzzle from "./Puzzle";

export type InputDevice = "keyboard" | "mouse";

/** layer between Userinput and the puzzle. 
 * Interprets the input and updates the puzzle as necessary */
export interface PuzzleHandler<Type> {
    puzzle: Puzzle<Type>;
    selection?: Selection;
    // for sudoku inputs are only given by keyboard, but for other puzzles, mouseInputs should also work
    inputHandler: (type: InputDevice, input: string) => void;
}

export class SudokuHandler<Type> implements PuzzleHandler<Type> {
    puzzle: Puzzle<Type>
    selection: Selection

    constructor(puzzle: Puzzle<Type>, selection: Selection) {
        this.puzzle = puzzle;
        this.selection = selection;
    }

    inputHandler(type: InputDevice, input: string){
        if (type === "mouse") return;
        else if (type === "keyboard" && isAlphaNumeric(input)){
            this.selection.actOnSelected(coord => {
                if (this.puzzle.baseGrid.getVal(coord[0], coord[1]) === ""){
                    this.puzzle.setVal(coord[0], coord[1], input as Type);
                }
            });
        }
    }
}

export function defaultKeyboardHandler<Type>(e: React.KeyboardEvent, handler: PuzzleHandler<Type>, selection: Selection){
    let inputType: InputType = getKeyboardInputType(e);
    console.log(inputType);
    if (inputType === "input") handler.inputHandler("keyboard", e.key);
    else if (inputType === "movement") defaultSelectionKeyHandler(e.key as keyDirection, selection);
    else if (inputType === "utility") console.log("utility key: ", e.key);
    else console.log("other key: ", e.key)
}