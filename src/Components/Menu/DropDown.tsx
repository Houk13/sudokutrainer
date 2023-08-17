interface DropDownProps{
    update: (value: string) => void;
    topic: string;
    current: string;
    options: string[];
}

export default function DropDownMenu(props: DropDownProps) {
    function handleChange(){
        let elem = document.getElementById("ddm_" + props.topic) as HTMLSelectElement
        props.update(elem.value);
    }

    let optsList: JSX.Element[] = [];
    for (let option of props.options) {
        optsList.push(<option key={"dd_" + option} value={option}>{option}</option>)
    }

    return (
        <select id={"ddm_" + props.topic} onChange={handleChange}>
            {optsList}
        </select>
    )
}