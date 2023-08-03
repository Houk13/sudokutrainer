type coordinate = [number, number];

export default class Selection {
    items: Map<string, boolean>
    nSelected: number

    constructor(){
        this.items = new Map();
        this.nSelected = 0;
    }

    clear(): void {
        this.items.clear();
        this.nSelected = 0;
    }
    private toString(coord: coordinate) {return coord[0] + ":" + coord[1]}

    private add(cel: coordinate): void {
        this.items.set(this.toString(cel), true);
    }

    private remove(cel: coordinate): void {
        this.items.delete(this.toString(cel));
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

    get(cel: coordinate): boolean {
        return this.items.get(this.toString(cel)) ?? false;
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
