import './Puzzle.css'
import Selection, { defaultMouseHandler} from '../../UILogic/Selection';
import SudokuPlayer from './Sudoku/SudokuPlayer';
import { isNumeric } from './inputHandlers';
import QuickScanSudokuPlayer from './Sudoku/QuickScanSudokuPlayer';
import { randomInt } from 'mathjs';
import { useState } from 'react';
import Puzzle from '../../puzzleLogic/Classes/Puzzle';
import { SudokuHandler, defaultKeyboardHandler } from '../../puzzleLogic/Classes/PuzzleHandler';


interface PuzzleAreaprops<Type extends number | "">{
  update: () => void;  
  data: any;
  puzzleType: string;
  selected: Selection;
  puzzle: Puzzle<Type>;
  puzzleGenerator: () => void;
  scores?: any;
  settings?: any;
  userInfo?: any;
}

function PuzzleArea<Type extends number | "">(props: PuzzleAreaprops<Type>) {

  // create default items, which can be changed by the specific puzzle funcions
  let puzzle1: JSX.Element = <h1>type of puzzle was not recognized</h1>;
  let keyboardHandler = (e: React.KeyboardEvent) => console.log("no keyboard eventHanlder available for: ", e.key);
  let mouseHandler = (e: React.MouseEvent, row: number, col: number) => console.log("no mouseHandler is active")
  let [quickResult, setQuickResult] = useState("none");
  if (props.puzzleType === 'SudokuClassic' && props.puzzle !== undefined) {
    const handler = new SudokuHandler(props.puzzle, props.selected)
    keyboardHandler = (e: React.KeyboardEvent) => {
      defaultKeyboardHandler<Type>(e, handler, props.selected);
      props.update();
    }
    mouseHandler = (e: React.MouseEvent, row: number, col: number) => {
      defaultMouseHandler(e, props.selected, row, col);
      props.update();
    }
    puzzle1 = <SudokuPlayer update={props.update} 
                      puzzleType='Sudoku' 
                      puzzle={props.puzzle}
                      selected={props.selected}
                      mouseHandler={mouseHandler}></SudokuPlayer>
  } 
  // -----------------QUICKSCAN --------------- NEEDS UPDATE TO USE THE PUZZLE CLASS
  else if (props.puzzleType === 'SudokuQuickScan') {
    keyboardHandler = (e: React.KeyboardEvent) => {
      // if input is alphanumeric, treat is as puzzleEntry
      if (isNumeric(e.key)){
        const result = Number(e.key) === props.puzzle.answer;
        if (result) {
          setQuickResult("correct");
        } else {
          setQuickResult("wrong");
        }
        console.log(quickResult);
        props.puzzleGenerator!();
      }
      props.update();
    }
    mouseHandler = (e: React.MouseEvent, row: number, col: number) => {
      console.log(e.button);
    }
    let type = props.data.type;
    if (type === "any") type = ["row", "col", "box"][randomInt(0, 3)] as "row"| "col" | "box"
    puzzle1 = <QuickScanSudokuPlayer update={props.update}
                      puzzleType='quickScanSudoku'
                      puzzle={props.puzzle}
                      selected={props.selected}
                      ></QuickScanSudokuPlayer>
  }
  // -----------------INPUT TESTING --------------- 
  // else if (props.puzzleType === 'inputTestSudoku') {
  //   const handler = new SudokuHandler(props.puzzle, props.selected)
  //   keyboardHandler = (e: React.KeyboardEvent) => {
  //     let inputType: InputType = getKeyboardInputType(e);
  //     console.log(inputType);
  //     if (inputType === "input") handler.inputHandler("keyboard", e.key);
  //     else if (inputType === "movement") defaultSelectionKeyHandler(e.key as keyDirection, props.selected);
  //     else if (inputType === "utility") console.log("utility key: ", e.key);
  //     else console.log("other key: ", e.key)
  //     props.update();
  //   }
  //   let type = props.data.type;
  //   if (type === "any") type = ["row", "col", "box"][randomInt(0, 3)] as "row"| "col" | "box"
  //   puzzle1 = <QuickScanSudokuPlayer update={props.update}
  //                     puzzleType='quickScanSudoku'
  //                     puzzle={props.puzzle}
  //                     selected={props.selected}
  //                     ></QuickScanSudokuPlayer>
  // }
  const areaID = "PuzzleArea1";

  return (
    <div id={areaID} className={'PuzzleArea ' + quickResult} 
        tabIndex={-1} 
        onClick={() => document.getElementById(areaID)?.focus()}
        onKeyDown={keyboardHandler}>
        {puzzle1}
    </div>
  )
}

export default PuzzleArea