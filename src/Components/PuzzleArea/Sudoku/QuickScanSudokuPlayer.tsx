import Cell from '../Cell';
import '../Puzzle.css'
import Selection from '../../../UILogic/Selection';
import SudokuBorder from './SudokuBorder';
import { celValue } from '../../../puzzleLogic/Classes/Puzzle';
import quickSudokuScanGenerator, { QuickSudokuScan } from '../../../puzzleLogic/Sudoku/generateQuickSudokuScan';

interface quickScanPlayerprops{
  update: () => void;
  puzzleType: string;
  puzzle: QuickSudokuScan;
  type: "row" | "col" | "box";
}

function QuickScanSudokuPlayer(props: quickScanPlayerprops) {
  function renderCell(row: number, col: number, value: celValue<number>){   
    return <Cell
            key={"Cell" + String(row) + String(col)} 
            coords={[row, col]}
            content={value}
            isSelected={value === ""}></Cell>
            
  }
  function renderBorder(row: number, col: number, bordershape: string) {
    return <SudokuBorder key={bordershape + String(row) + String(col)} row={row} col={col} borderShape={bordershape}></SudokuBorder>
  }
  function renderBorderRow(row: number, width: number) {
    let rowCells: JSX.Element[] = [];
    for (let col = 0; col !== width; ++col){
      rowCells.push(renderBorder(row, col, "intersectBorder"));
      rowCells.push(renderBorder(row, col, "horizontalBorder"));
    }
    rowCells.push(renderBorder(row, width, "intersectBorder"));
    return rowCells;
  }
  function renderSudokuGrid(){
    let width: number;
    let height: number;
    let idx: number = 0;

    if (props.type === "row")       { width = 9; height = 1}
    else if (props.type === "col")  { width = 1; height = 9}
    else                            { width = 3; height = 3}

    let sudokugrid: JSX.Element[][] = []
    for (let row = 0; row !== height; row++){
      sudokugrid.push(renderBorderRow(row, width));
      let rowCells: JSX.Element[] = [];
      for (let col = 0; col !== width; col++){
        rowCells.push(renderBorder(row, col, "verticalBorder"));
        rowCells.push(renderCell(row, col, props.puzzle.values[idx++]));
        // rowCells.push(renderCell(row, col, idx++));
      }
      rowCells.push(renderBorder(row, width, "verticalBorder"));
      sudokugrid.push(rowCells);
    }
    sudokugrid.push(renderBorderRow(height, width));
    return(<div className={"sudokuJust" + props.type}>{sudokugrid}</div>)
  }
  const areaID = "QuickScan1";

  return (
    <div id={areaID} className='Sudoku' 
        tabIndex={-1} >
      <div className='puzzle'>
        {renderSudokuGrid()}
      </div>
    </div>
  )
}

export default QuickScanSudokuPlayer;