import React, { useState } from 'react'


interface CellProps<Type>{
    bordertype?: ["top" | "mid" | "bottom", "left" | "center" | "right"];
    content: Type;
    coords: [number, number];
    clickHandler?: (e: any) => void;
    isSelected?: boolean;
}

function Cell<Type>(props: CellProps<Type>) {
    let [isSelected, setSelected] = useState(props.isSelected ?? false)
    let defaultHandler = (e: any) => {
        e.preventDefault(); console.log([props.coords[0] + 1, props.coords[1] + 1])
        setSelected(!isSelected);
    }
    let clickhandler = props.clickHandler ?? props.clickHandler;

        
    const selectString = isSelected? "selected" : "";
    // const classString = "cell " + props.bordertype[0] + " " + props.bordertype[1]
    const classString = "cell "+ "Row" + props.coords[0] + " Col" + props.coords[1] + " " + selectString;
    return (
        <div className={classString}
            onMouseDown={clickhandler}>
            {String(props.content)}
        </div>
    )
}

export default Cell