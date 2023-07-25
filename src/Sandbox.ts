
// import Cell from "./puzzleLogic/Classes/Cell";
import Selection from "./UILogic/Selection";
import { Options } from "./puzzleLogic/Classes/Options"
import { isSetNtoM } from "./puzzleLogic/Scripts/helperFunctions";
import { sudoku } from "./puzzleLogic/Sudoku/TestSudoku";
import generateQuickSudokuScan from "./puzzleLogic/Sudoku/generateQuickSudokuScan";
// import { isSet1to9 } from "./puzzleLogic/Scripts/sudokuRules";

// let file = fetch("test.txt").then(res => res.text()).then(res => console.log(res));

// async function writeFile(url = "", data = {}){
//     try {
//         const response = await fetch(url, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         });
        
//         const result = await response.json();
//         console.log("Success: ", result);        
//     } catch(error) {
//         console.error("Error: ", error);
//     }
// }


let generator = generateQuickSudokuScan();
console.log(generator());

console.log(isSetNtoM([2, 3.2, 4], 4, 2));

let list = [1, 2, 3, "hoi"];
const sudokuOptionList = list;
// const sudokuOptionList = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
type sudokuOptionType = typeof sudokuOptionList[number];
// type Options<T> = Map<T, boolean>
// let sudokuOptions: Options<sudokuOptionType> = new Map([[1, true], [2, true]])

let sudokuOptions: Options<sudokuOptionType> = new Map();

for (const opt of sudokuOptionList){
    sudokuOptions.set(opt, true);
}


export default function testCell(){
    console.log(sudoku.isSolved());
}
