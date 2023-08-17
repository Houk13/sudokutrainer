import { PuzzleStyles} from "../../Settings/puzzleOptions";
import DropDownMenu from "./DropDown";
import MenuButton from "./MenuButton";

interface Sidebarprops{
    data: any;
    puzzleOptions: string[];
    puzzleStyleOptions: PuzzleStyles;
    update: () => void;
    puzzleGenerator: () => void;
}

export default function Sidebar(props: Sidebarprops) {
  return <div className='Sidebar'>
    <DropDownMenu update={(val: string) => {props.data.puzzleOptionSelected = val;props.puzzleGenerator()}} topic="puzzleOption" current={props.data.puzzleOptionSelected} options={props.puzzleOptions}></DropDownMenu>
    <DropDownMenu update={(val: string) => {props.data.puzzleStyleSelected = val;props.puzzleGenerator()}} topic="puzzleStyle" current={props.data.puzzleStyleSelected} options={props.puzzleStyleOptions.styles}></DropDownMenu>
    <MenuButton buttonText="only Rows" clickhandler={() => {props.data.type = "row"; props.update()}}></MenuButton>
    <MenuButton buttonText="only Cols" clickhandler={() => {props.data.type = "col"; props.update()}}></MenuButton>
    <MenuButton buttonText="only Boxes" clickhandler={() => {props.data.type = "box"; props.update()}}></MenuButton>
    <MenuButton buttonText="any Type" clickhandler={() => {props.data.type = "any"; props.update()}}></MenuButton>
  </div>
}

