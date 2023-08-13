import { InputMode } from "../UILogic/PuzzleInputHandler"

interface InputSettings{
    type: InputMode
}

export const inputSettings: InputSettings  = {
    type: "Sudoku"
}