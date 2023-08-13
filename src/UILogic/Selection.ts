type coordinate = [number, number];
export type keyDirection = "ArrowUp" | "ArrowLeft" | "ArrowDown" | "ArrowRight";

export default class Selection {
    items: Map<string, coordinate>
    nSelected: number
    latest: coordinate | undefined

    constructor(){
        this.items = new Map();
        this.nSelected = 0;
    }

    clear(): void {
        this.items.clear();
        this.nSelected = 0;
        this.latest = undefined;
    }
    softClear(): void {
        this.items.clear();
        this.nSelected = 0;
        if (this.latest !== undefined) this.add(this.latest);
    }

    private toString(coord: coordinate) {return coord[0] + ":" + coord[1]}
    private fromString(str: string) {
        const strArr = str.split(':');
        return [Number(strArr[0]), Number(strArr[1])];
    }

    private add(cel: coordinate): void {
        this.items.set(this.toString(cel), cel);
        this.latest = cel;
    }

    private remove(cel: coordinate): void {
        this.items.delete(this.toString(cel));
        this.items.forEach(cel => this.latest = cel);
    }

    flip(cel: coordinate): void {
        if (this.items.get(this.toString(cel)) === undefined) {
            this.add(cel);
            this.nSelected++;
            // console.log("added ", cel);
        } else {
            this.remove(cel);
            this.nSelected--;
        }
    }

    isSelected(cel: coordinate): boolean {
        return (this.items.get(this.toString(cel)) !== undefined) ? true : false;
    }

    select(cel: coordinate): void {
        let wasOn = this.isSelected(cel) && this.nSelected === 1;
        this.clear();
        if (!wasOn) this.flip(cel);
    }

    actOnSelected(fun: (cel: coordinate) => any) {
        this.items.forEach(val => fun(val));
    }
}

export function defaultMouseHandler(e: React.MouseEvent, selection: Selection, row: number, col: number): void{
    if (e.ctrlKey){ 
      selection.flip([row, col])
    }
    else {
      selection.select([row, col])
    }
}

export function defaultSelectionKeyHandler(key: keyDirection, selection: Selection) {
    let prev: coordinate = selection.latest?? [0, 0];
    selection.softClear();
    switch (key) {
        case "ArrowUp":
            let rowUp = prev[0] - 1;
            selection.select([rowUp, prev[1]]);
            break;
        case "ArrowDown":
            let rowDown = prev[0] + 1;
            selection.select([rowDown, prev[1]]);
            break;
        case "ArrowLeft":
            let colLeft = prev[1] - 1;
            selection.select([prev[0], colLeft]);
            break;
        case "ArrowRight":
            let colRight = prev[1] + 1;
            selection.select([prev[0], colRight]);
            break;
        default:
            break;
    }
}
