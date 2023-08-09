import './Puzzle.css'
import Selection from '../../UILogic/Selection';
import SudokuPlayer from './Sudoku/SudokuPlayer';
import { isAlphaNumeric, isNumeric } from './inputHandlers';
import QuickScanSudokuPlayer from './Sudoku/QuickScanSudokuPlayer';
import { randomInt } from 'mathjs';
import { useState } from 'react';
import Puzzle from '../../puzzleLogic/Classes/Puzzle';

interface PuzzleAreaprops<Type extends number | "">{
  update: () => void;  
  data: any;
  puzzleType: string;
  selected: Selection;
  puzzle: Puzzle<Type>;
  puzzleGenerator?: () => void;
  scores?: any;
  settings?: any;
  userInfo?: any;
}

function PuzzleArea<Type extends number | "">(props: PuzzleAreaprops<Type>) {
  // create default items, which can be changed by the specific puzzle funcions
  let puzzle1: JSX.Element = <h1>type of puzzle was not recognized</h1>;
  let keyboardHandler = (e: React.KeyboardEvent) => console.log("no keyboard eventHanlder available for: ", e.key);
  let [quickResult, setQuickResult] = useState("none");
  if (props.puzzleType === 'sudoku' && props.puzzle !== undefined) {
    
    keyboardHandler = (e: React.KeyboardEvent) => {
      // if input is alphanumeric, treat is as puzzleEntry
      if (isAlphaNumeric(e.key)){
        props.selected.items.forEach((val, coord) => {
          if (val) {
            const coordstring: string[] = coord.split(':');
            const coords: number[] = [];
            coordstring.forEach(str => coords.push(Number(str)));
            if (props.puzzle.baseGrid.getVal(coords[0], coords[1]) === ""){
              props.puzzle.setVal(coords[0], coords[1], e.key as Type);
            }
          }
        });
      }
      props.update();
    }
    puzzle1 = <SudokuPlayer update={props.update} 
                      puzzleType='Sudoku' 
                      puzzle={props.puzzle}
                      selected={props.selected}></SudokuPlayer>
  } 
  // -----------------QUICKSCAN --------------- NEEDS UPDATE TO USE THE PUZZLE CLASS
  else if (props.puzzleType === 'quickScanSudoku') {
    keyboardHandler = (e: React.KeyboardEvent) => {
      // if input is alphanumeric, treat is as puzzleEntry
      if (isNumeric(e.key)){
        const result = Number(e.key) === props.puzzle.answer;
        console.log(result);
        if (result) {
          setQuickResult("correct");
        } else {
          setQuickResult("wrong");
        }
        props.puzzleGenerator!();
      }
      props.update();
    }
    let type = props.data.type;
    if (type === "any") type = ["row", "col", "box"][randomInt(0, 3)] as "row"| "col" | "box"
    puzzle1 = <QuickScanSudokuPlayer update={props.update}
                      puzzleType='quickScanSudoku'
                      puzzle={props.puzzle}
                      selected={props.selected}
                      ></QuickScanSudokuPlayer>
  }

  

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