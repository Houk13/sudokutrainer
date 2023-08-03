import React from 'react'

interface SudokuBorderProps{
    row: number;
    col: number;
    borderShape: string;
}

function SudokuBorder(props: SudokuBorderProps) {
    const row = props.row;
    const col = props.col;
    let borderType = "";
    if (props.borderShape === "horizontalBorder"){
        borderType = (row % 3 === 0) ? "thickBorder" : "thinBorder";
    } else if (props.borderShape === "verticalBorder") {
        borderType = (col % 3 === 0) ? "thickBorder" : "thinBorder";
    } else {
        borderType = (row % 3 === 0 || col % 3 === 0) ? "thickBorder" : "thinBorder";
    }
    return <div className={"border " + props.borderShape + " " + borderType}></div>
}

export default SudokuBorder