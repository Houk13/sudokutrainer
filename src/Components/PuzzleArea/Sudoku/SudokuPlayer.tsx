import Cell from '../Cell';
import '../Puzzle.css'
import Selection from '../../../UILogic/Selection';
import SudokuBorder from './SudokuBorder';
import Puzzle, { celValue } from '../../../puzzleLogic/Classes/Puzzle';
import PuzzleGrid from '../../../puzzleLogic/Classes/PuzzleGrid';

interface SudokuPlayerprops<Type>{
  update: () => void;  
  puzzleType: string;
  puzzle: Puzzle<Type>;
  selected: Selection;
  mouseHandler: (e: React.MouseEvent, row: number, col: number) => void;
}

function SudokuPlayer<Type>(props: SudokuPlayerprops<Type>) {

  function renderCell(row: number, col: number){
    const mouseDownHandler = (e: React.MouseEvent) => {
      props.mouseHandler(e, row, col);
    }
    
    return <Cell
            key={"Cell" + String(row) + String(col)} 
            coords={[row, col]}
            content={props.puzzle.getVal(row, col)}
            clickHandler={mouseDownHandler}
            isSelected={props.selected.isSelected([row, col])}
            extraClasses={props.puzzle.baseGrid.getVal(row, col) === "" ? "" : "baseValue"}/>
            
  }
  function renderBorder(row: number, col: number, bordershape: string) {
    return <SudokuBorder key={bordershape + String(row) + String(col)} row={row} col={col} borderShape={bordershape}></SudokuBorder>
  }
  function renderBorderRow(row: number) {
    let rowCells: JSX.Element[] = [];
    for (let col = 0; col !== 9; ++col){
      rowCells.push(renderBorder(row, col, "intersectBorder"));
      rowCells.push(renderBorder(row, col, "horizontalBorder"));
    }
    rowCells.push(renderBorder(row, 9, "intersectBorder"));
    return rowCells;
  }
  function renderSudokuGrid(){
    let sudokugrid: JSX.Element[][] = []
    for (let row = 0; row !== 9; ++row){
      sudokugrid.push(renderBorderRow(row));
      let rowCells: JSX.Element[] = [];
      for (let col = 0; col !== 9; ++col){
        rowCells.push(renderBorder(row, col, "verticalBorder"));
        rowCells.push(renderCell(row, col));
      }
      rowCells.push(renderBorder(row, 9, "verticalBorder"));
      sudokugrid.push(rowCells);
    }
    sudokugrid.push(renderBorderRow(9));
    return(<div className='sudokuGrid'>{sudokugrid}</div>)
  }

  const areaID = "Sudoku1";

  return (
    <div id={areaID} className='Sudoku' 
        tabIndex={-1} >
      <div className='puzzle'>
        {renderSudokuGrid()}
      </div>
    </div>
  )
}

export default SudokuPlayer