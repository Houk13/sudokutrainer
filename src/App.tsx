import React, { useEffect, useState } from 'react'
import "./App.css"
import Sidebar from './Components/Sidebar';
import PuzzleArea from './Components/PuzzleArea/PuzzleArea';
import { preventRightMouseMenu } from './helperFunctions';

import testCell from './Sandbox';
import MenuButton from './Components/MenuButton';
import { sudoku } from './puzzleLogic/Sudoku/Sudoku';

let globalData = {
  refresh: 0
}

const testRow = new Array(9).fill("");
const testSudoku = sudoku;
//  [testRow, testRow, testRow, testRow, testRow, testRow, testRow, testRow, testRow];

function App() {
  useEffect(preventRightMouseMenu, []);
  let [data, changeData] = useState(globalData);
  function updateData(){
    changeData({refresh: ++data.refresh});
  }

  return (
    <div className="App">
      <MenuButton buttonText='test sandbox function' clickhandler={testCell} classString='sandbox'></MenuButton>
      <Sidebar update={updateData}/>
      <PuzzleArea puzzleType="sudoku" puzzle={testSudoku.grid}/>
    </div>
  );
}

export default App;
