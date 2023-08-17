import React, { useEffect, useState } from 'react'
import "./App.css"
import Sidebar from './Components/Menu/Sidebar';
import PuzzleArea from './Components/PuzzleArea/PuzzleArea';
import { preventDefaultKeyboardShortcuts, preventRightMouseMenu } from './helperFunctions';
import Selection from './UILogic/Selection';
import { generateQuickScanSudokuPuzzle } from './puzzleLogic/Sudoku/generateQuickSudokuScan';
import { sudoku } from './puzzleLogic/Sudoku/TestSudoku';
import { SudokuStyles, PuzzleOptions, toMapKeyArray } from './Settings/puzzleOptions';
import Puzzle from './puzzleLogic/Classes/Puzzle';
import PuzzleGrid from './puzzleLogic/Classes/PuzzleGrid';

let globalData = {refresh: 0, type: "any", puzzleOptionSelected: "Sudoku", puzzleStyleSelected: "Classic"};
let selectionRefresh = {refresh: 0};

const selection = new Selection();

const [startPuzzle, startSelection, startAnswer] = generateQuickScanSudokuPuzzle("any");
selection.flip(startSelection);

function App() {
  useEffect(preventRightMouseMenu, []);
  useEffect(preventDefaultKeyboardShortcuts, []);
  let [data, changeData] = useState(globalData);
  let [newSelection, updateSelection] = useState(selectionRefresh);
  // let appStartPuzzle = (data.puzzleStyleSelected === "Classic") ? sudoku : startPuzzle;
  let [puzzle, updatePuzzle] = useState(sudoku);
  function update(fun: any, data: any){
    return () => fun({...data, refresh: ++data.refresh} );
  }

  const generateNewPuzzle = () => {
    if (data.puzzleOptionSelected === "Sudoku"){
      if (data.puzzleStyleSelected === "Classic"){
        updatePuzzle(sudoku);
      } 
      else if (data.puzzleStyleSelected === "QuickScan"){
        generateQuickScan()
      }
    }
    else {
      updatePuzzle(new Puzzle(new PuzzleGrid([])))
    }
  }

  const generateQuickScan = () => {
    let [scanPuzzle, answerCel, answer] = generateQuickScanSudokuPuzzle(data.type as "row" | "col" | "box" | "any");
    selection.clear();
    selection.flip(answerCel);
    updatePuzzle(scanPuzzle);
  };

  
  return (
    <div className="App">
      {/* <MenuButton buttonText='test sandbox function' clickhandler={testCell} classString='sandbox'></MenuButton> */}
      <Sidebar data={data} puzzleOptions={toMapKeyArray(PuzzleOptions)} puzzleStyleOptions={SudokuStyles} update={update(changeData, data)} puzzleGenerator={generateNewPuzzle}/>
      <PuzzleArea update={update(updateSelection, newSelection)} data={data} puzzleType={data.puzzleOptionSelected + data.puzzleStyleSelected} puzzle={puzzle} puzzleGenerator={generateNewPuzzle} selected={selection}/>
      {/* <PuzzleArea update={update(updateSelection, newSelection)} data={data} puzzleType={"SudokuQuickScan"} puzzle={puzzle} puzzleGenerator={generateQuickScan} selected={selection}/> */}
    </div>
    
  );
}

export default App;
