import React from 'react'


interface CellProps<Type>{
    bordertype: ["top" | "mid" | "bottom", "left" | "center" | "right"];
    content: Type;
    coords: [number, number];
}

function Cell<Type>(props: CellProps<Type>) {
    let clickhandler = (e: any) => {e.preventDefault(); console.log([props.coords[0] + 1, props.coords[1] + 1])}

    // const classString = "cell " + props.bordertype[0] + " " + props.bordertype[1]
    const classString = "cell "+ "Row" + props.coords[0] + " Col" + props.coords[1];
    return (
        <div className={classString}
            onMouseDown={clickhandler}>
            {String(props.content)}
        </div>
    )
}

export default Cell