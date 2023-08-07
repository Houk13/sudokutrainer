import './Puzzle.css'
import Selection from '../../UILogic/Selection';
import SudokuPlayer from './Sudoku/SudokuPlayer';
import { isAlphaNumeric, isNumeric } from './inputHandlers';
import QuickScanSudokuPlayer from './Sudoku/QuickScanSudokuPlayer';
import { QuickSudokuScan } from '../../puzzleLogic/Sudoku/generateQuickSudokuScan';
import { randomInt } from 'mathjs';
import { useState } from 'react';
import Puzzle from '../../puzzleLogic/Classes/Puzzle';

interface PuzzleAreaprops<Type extends number | "">{
  update: () => void;  
  data: any;
  puzzleType: string;
  selected: Selection;
  puzzle: Puzzle<Type>;
  quickScanSudoku?: QuickSudokuScan;
  quickScanGenerater?: () => void;
  scores?: any;
  settings?: any;
  userInfo?: any;
}

function PuzzleArea<Type extends number | "">(props: PuzzleAreaprops<Type>) {
  let puzzle1: JSX.Element = <h1>type of puzzle was not recognized</h1>;
  let keyboardHandler = (e: React.KeyboardEvent) => console.log(e.key);
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
            props.puzzle.grid[coords[0]][coords[1]] = e.key as Type;
          }
        });
      }
      props.update();
    }
    puzzle1 = <SudokuPlayer update={props.update} 
                      puzzleType='Sudoku' 
                      puzzle={props.puzzle.grid as Type[][]}
                      selected={props.selected}></SudokuPlayer>
  } else if (props.puzzleType === 'quickScanSudoku' && props.quickScanSudoku !== undefined) {
    keyboardHandler = (e: React.KeyboardEvent) => {
      // if input is alphanumeric, treat is as puzzleEntry
      if (isNumeric(e.key)){
        const result = Number(e.key) === props.quickScanSudoku?.answer;
        console.log(result);
        if (result) {
          setQuickResult("correct");
        } else {
          setQuickResult("wrong");
        }
        props.quickScanGenerater!();
      }
      props.update();
    }
    let type = props.data.type;
    if (type === "any") type = ["row", "col", "box"][randomInt(0, 3)] as "row"| "col" | "box"
    puzzle1 = <QuickScanSudokuPlayer update={props.update}
                      puzzleType='quickScanSudoku'
                      puzzle={props.quickScanSudoku}
                      type={type}
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