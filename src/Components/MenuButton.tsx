interface Buttonprops {
    buttonText: string;
    clickhandler: () => void;
    classString?: string; 
}

function MenuButton(props: Buttonprops) {
  return (
    <button className={props.classString} onClick={props.clickhandler}>{props.buttonText}</button>
  )
}

export default MenuButton