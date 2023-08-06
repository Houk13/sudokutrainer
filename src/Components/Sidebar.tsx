import MenuButton from "./MenuButton";

interface Sidebarprops{
    data: any;
    update: () => void;
}

export default function Sidebar(props: Sidebarprops) {
  return <div className='Sidebar'>
    <MenuButton buttonText="only Rows" clickhandler={() => {props.data.type = "row"; props.update()}}></MenuButton>
    <MenuButton buttonText="only Cols" clickhandler={() => {props.data.type = "col"; props.update()}}></MenuButton>
    <MenuButton buttonText="only Boxes" clickhandler={() => {props.data.type = "box"; props.update()}}></MenuButton>
    <MenuButton buttonText="any Type" clickhandler={() => {props.data.type = "any"; props.update()}}></MenuButton>
  </div>
}

