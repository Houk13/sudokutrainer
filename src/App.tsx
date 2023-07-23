import React, { useEffect, useState } from 'react'
import "./App.css"
import Sidebar from './Components/Sidebar';
import PuzzleArea from './Components/PuzzleArea/PuzzleArea';
import { preventRightMouseMenu } from './helperFunctions';

import testCell from './Sandbox';
import MenuButton from './Components/MenuButton';
import { sudoku } from './puzzleLogic/Sudoku/Sudoku';
import Selection from './UILogic/Selection';

let globalData = {refresh: 0};
let selectionRefresh = {refresh: 0};

const testRow = new Array(9).fill("");
const testSudoku = sudoku;
const selection = new Selection();
//  [testRow, testRow, testRow, testRow, testRow, testRow, testRow, testRow, testRow];

function App() {
  useEffect(preventRightMouseMenu, []);
  let [data, changeData] = useState(globalData);
  let [newSelection, updateSelection] = useState(selectionRefresh);
  function update(fun: any, data: any){
    return () => fun({refresh: ++data.refresh});
  }

  return (
    <div className="App">
      <MenuButton buttonText='test sandbox function' clickhandler={testCell} classString='sandbox'></MenuButton>
      <Sidebar update={update(changeData, data)}/>
      <PuzzleArea update={update(updateSelection, newSelection)} puzzleType="sudoku" puzzle={testSudoku.grid} selected={selection}/>
      <p>{newSelection.refresh}: {selection.get([0,0])}</p>
    </div>
    
  );
}

export default App;
