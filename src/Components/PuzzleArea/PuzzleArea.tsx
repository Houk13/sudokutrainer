import './Puzzle.css'
import Selection from '../../UILogic/Selection';
import SudokuPlayer from './Sudoku/SudokuPlayer';

interface PuzzleAreaprops<Type extends number | "">{
  update: () => void;  
  puzzleType: string;
  puzzle: Type[][];
  selected: Selection;
}

function PuzzleArea<Type extends number | "">(props: PuzzleAreaprops<Type>) {
  let puzzle1: JSX.Element = <h1>type of puzzle was not recognized</h1>;
  if (props.puzzleType === 'sudoku') {
    puzzle1 = <SudokuPlayer update={props.update} 
                      puzzleType='Sudoku' 
                      puzzle={props.puzzle}
                      selected={props.selected}
                      keyboardHandler={keyboardHandler}></SudokuPlayer>
  }

  function keyboardHandler(e: React.KeyboardEvent) {
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90)){
      props.selected.items.forEach((val, coord) => {
        if (val) {
          const coordstring: string[] = coord.split(':');
          const coords: number[] = [];
          coordstring.forEach(str => coords.push(Number(str)));
          props.puzzle[coords[0]][coords[1]] = e.key as Type;
        }
      });
    }
    props.update();
  }

  const areaID = "PuzzleArea1";

  return (
    <div id={areaID} className='PuzzleArea' 
        tabIndex={-1} 
        onClick={() => document.getElementById(areaID)?.focus()}
        onKeyDown={keyboardHandler}>
      <div className='puzzle'>
        {puzzle1}
      </div>
    </div>
  )
}

export default PuzzleArea