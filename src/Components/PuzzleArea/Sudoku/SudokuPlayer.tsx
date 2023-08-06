import Cell from '../Cell';
import '../Puzzle.css'
import Selection from '../../../UILogic/Selection';
import SudokuBorder from './SudokuBorder';
import { celValue } from '../../../puzzleLogic/Classes/Puzzle';

interface SudokuPlayerprops{
  update: () => void;  
  puzzleType: string;
  puzzle: celValue<number>[][];
  selected: Selection;
}

function SudokuPlayer(props: SudokuPlayerprops) {

  function renderCell(row: number, col: number, value: celValue<number>){
    const mouseDownHandler = (e: React.MouseEvent) => {
      if (e.ctrlKey){ 
        props.selected.flip([row, col])
      }
      else {
        let wasOn = props.selected.isSelected([row, col]) && props.selected.nSelected < 2;
        props.selected.clear();
        if (!wasOn) props.selected.flip([row, col]);
      }
      props.update();
    }
    
    return <Cell
            key={"Cell" + String(row) + String(col)} 
            coords={[row, col]}
            content={value}
            clickHandler={mouseDownHandler}
            isSelected={props.selected.isSelected([row, col])}></Cell>
            
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
        rowCells.push(renderCell(row, col, props.puzzle[row][col]));
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