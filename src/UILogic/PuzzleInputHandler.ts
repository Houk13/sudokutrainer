import React from "react";
import { isAlphaNumeric, isAlphabetic, isDirection } from "../Components/PuzzleArea/inputHandlers";

// The different input modes that I have (will) implemented.
export type InputMode = "Sudoku" | "Surface";
export type InputType = "utility" | "movement" | "input" | "other";

/** 
 * Determines what kind of input is given and calls the correct follow up functions
 * - Input (regular of type of pencilmark)
 * - movementInput (arrowkeys, escape, etc.)
 * - utilityInput (undo, redo, save, etc.)
 * @param e
 */
export function getKeyboardInputType(e: React.KeyboardEvent): InputType {
    if (e.ctrlKey && isAlphabetic(e.key)) {
        return "utility";
    } else if (isDirection(e.key)){
        return "movement";
    } else if (isAlphaNumeric(e.key)) {
        return "input";
    }
    return "other";
}
