import React, { useEffect, useState } from 'react'
import "./App.css"
import Sidebar from './Components/Sidebar';
import PuzzleArea from './Components/PuzzleArea/PuzzleArea';
import { preventDefaultKeyboardShortcuts, preventRightMouseMenu } from './helperFunctions';
import Selection from './UILogic/Selection';
import { generateQuickScanSudokuPuzzle } from './puzzleLogic/Sudoku/generateQuickSudokuScan';
import { sudoku } from './puzzleLogic/Sudoku/TestSudoku';

let globalData = {refresh: 0, type: "any"};
let selectionRefresh = {refresh: 0};

const selection = new Selection();

const [startPuzzle, startSelection, startAnswer] = generateQuickScanSudokuPuzzle("any");
selection.flip(startSelection);

const puzzType = "inputTestSudoku";

function App() {
  useEffect(preventRightMouseMenu, []);
  useEffect(preventDefaultKeyboardShortcuts, []);
  let [data, changeData] = useState(globalData);
  let [newSelection, updateSelection] = useState(selectionRefresh);
  let [puzzle, updatePuzzle] = useState(startPuzzle);
  function update(fun: any, data: any){
    return () => fun({...data, refresh: ++data.refresh} );
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
      <Sidebar data={data} update={update(changeData, data)}/>
      <PuzzleArea update={update(updateSelection, newSelection)} data={data} puzzleType="sudoku" puzzle={sudoku} selected={selection}/>
      {/* <PuzzleArea update={update(updateSelection, newSelection)} data={data} puzzleType={puzzType} puzzle={puzzle} puzzleGenerator={generateQuickScan} selected={selection}/> */}
    </div>
    
  );
}

export default App;
