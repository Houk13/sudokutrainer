import './Puzzle.css'
import Cell from './Cell';
import SudokuBorder from './SudokuBorder';
import Selection from '../../UILogic/Selection';

interface PuzzleAreaprops<Type>{
  update: () => void;  
  puzzleType: string;
  puzzle: Type[][];
  selected: Selection;
    
}

const borderTBTypes = ["top", "mid", "bottom"] as const;
const borderLRTypes = ["left", "center", "right"] as const;

function PuzzleArea<Type>(props: PuzzleAreaprops<Type>) {
  function renderCell(row: number, col: number, value: Type){
    return <Cell 
            key={"Cell" + String(row) + String(col)} 
            bordertype={[borderTBTypes[row % 3], borderLRTypes[col % 3]]} 
            coords={[row, col]}
            content={value}
            clickHandler={(e) => {
              props.selected.flip([row, col]);
              console.log(props.selected);
              props.update();
            }}
            isSelected={props.selected.get([row, col])}></Cell>
            
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

  const areaID = "PuzzleArea1";

  return (
    <div id={areaID} className='PuzzleArea' 
        onKeyDown={e => console.log(e.key)} 
        tabIndex={-1} 
        onClick={() => document.getElementById(areaID)?.focus()}>
      <div className='puzzle'>
        {renderSudokuGrid()}
      </div>
    </div>
  )
}

export default PuzzleArea