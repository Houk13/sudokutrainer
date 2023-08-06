type coordinate = [number, number];

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
        console.log(this.latest);
    }

    isSelected(cel: coordinate): boolean {
        return (this.items.get(this.toString(cel)) !== undefined) ? true : false;
    }

    actOnSelected(fun: (cel: coordinate) => any) {
        this.items.forEach(val => fun(val));
    }
}

// export default class Selection {
//     items: coordinate[]

//     constructor(cel?: coordinate){
//         if (cel) {
//             this.items = [cel];
//         } else {
//             this.items = [];
//         }
//     }

//     clear(): void {
//         this.items = [];
//     }

//     private add(cel: coordinate): void {
//         this.items.push(cel);
//     }

//     remove(celIdx: number): void {
//         this.items.splice(celIdx, 1);
//     }

//     flip(cel: coordinate): void {
//         const idx = this.items.findIndex(val => val[0] === cel[0] && val[1] === cel[1]);
//         if (idx === -1){
//             this.add(cel);
//         } else {
//             this.remove(idx);
//         }
//     }

// }
