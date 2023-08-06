import React, { useEffect, useState } from 'react'
import "./App.css"
import Sidebar from './Components/Sidebar';
import PuzzleArea from './Components/PuzzleArea/PuzzleArea';
import { preventRightMouseMenu } from './helperFunctions';

import testCell from './Sandbox';
import MenuButton from './Components/MenuButton';
import { sudoku } from './puzzleLogic/Sudoku/TestSudoku';
import Selection from './UILogic/Selection';
import quickScanSudokuGenerator from './puzzleLogic/Sudoku/generateQuickSudokuScan';

let globalData = {refresh: 0, type: "any"};
let selectionRefresh = {refresh: 0};

const testRow = new Array(9).fill("");
const testSudoku = sudoku;
let quickScanGenerator = quickScanSudokuGenerator();
let quickScan = quickScanGenerator();
const generateQuickScan = () => {quickScan = quickScanGenerator()};
const selection = new Selection();
//  [testRow, testRow, testRow, testRow, testRow, testRow, testRow, testRow, testRow];

function App() {
  useEffect(preventRightMouseMenu, []);
  let [data, changeData] = useState(globalData);
  let [newSelection, updateSelection] = useState(selectionRefresh);
  function update(fun: any, data: any){
    return () => fun({...data, refresh: ++data.refresh} );
  }

  return (
    <div className="App">
      {/* <MenuButton buttonText='test sandbox function' clickhandler={testCell} classString='sandbox'></MenuButton> */}
      <Sidebar data={data} update={update(changeData, data)}/>
      {/* <PuzzleArea update={update(updateSelection, newSelection)} puzzleType="sudoku" puzzle={testSudoku.grid} selected={selection}/> */}
      <PuzzleArea update={update(updateSelection, newSelection)} data={data} puzzleType="quickScanSudoku" quickScanSudoku={quickScan} quickScanGenerater={generateQuickScan} selected={selection}/>
    </div>
    
  );
}

export default App;
