// This file is for testing code. 
// It gets executed once on reload, and the default exported function is connected to 
// the "test sandbox function" button in the site menu





// import Cell from "./puzzleLogic/Classes/Cell";
import Selection from "./UILogic/Selection";
import { Options } from "./puzzleLogic/Classes/Options"
import { isSetNtoM } from "./puzzleLogic/Scripts/helperFunctions";
import * as sh from "./puzzleLogic/Scripts/sudokuHelper";
import { sudoku } from "./puzzleLogic/Sudoku/TestSudoku";
import generateQuickSudokuScan from "./puzzleLogic/Sudoku/generateQuickSudokuScan";
import { celValue } from "./puzzleLogic/Scripts/sudokuHelper";
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

// console.log(hasRepeatedNumber([1, 9, 2, 4, 5,9, 6]));

// let generator = generateQuickSudokuScan();
// console.log(generator());

const testSudoku: celValue[][] = 
                   [["", "", "", 7 , "", 1 , "", "", ""],
                    [7 , 3 , "", "", 9 , "", "", "", 2 ],
                    [5 , 6 , 1 , "", "", "", 4 , 9 , ""],
                    [4 , 7 , 2 , 3 , 1 , 8 , "", "", ""],
                    ["", "", "", 5 , "", 9 , "", "", ""],
                    ["", "", "", 4 , 6 , 7 , 2 , 8 , 3 ],
                    ["", 4 , 6 , "", "", "", 1 , 5 , 9 ],
                    [2 , "", "", "", 3 , "", "", 7 , 4 ],
                    ["", "", "", 1 , "", 5 , "", "", ""]];

// console.log(sh.getSudokuBox(testSudoku, 1))
console.log("boxOptions: ", sh.getBoxOptionGrid(testSudoku));
// console.log(sh.getSudokuRow(testSudoku, 1));
// console.log(sh.getDirectOptionGrid(testSudoku));
// console.log(sh.getDirectBoxOptions(testSudoku, 1));
// console.log(sh.getDirectRowOptions(testSudoku, 1));
// console.log(sh.getDirectCelOptions(testSudoku, 5, 9))                  

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
