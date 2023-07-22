import MenuButton from "./MenuButton";

interface Sidebarprops{
    update: () => void;
}

export default function Sidebar(props: Sidebarprops) {
  return <div className='Sidebar'>
    <MenuButton buttonText="test text" clickhandler={() => {props.update()}}></MenuButton>
    <MenuButton buttonText="button 2" clickhandler={() => {props.update()}}></MenuButton>
  </div>
}

