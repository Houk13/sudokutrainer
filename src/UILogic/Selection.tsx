type coordinate = [number, number];

export default class Selection {
    items: coordinate[]

    constructor(cel?: coordinate){
        if (cel) {
            this.items = [cel];
        } else {
            this.items = [];
        }
    }

    clear(): void {
        this.items = [];
    }

    private add(cel: coordinate): void {
        this.items.push(cel);
    }

    remove(celIdx: number): void {
        this.items.splice(celIdx, 1);
    }

    flip(cel: coordinate): void {
        const idx = this.items.findIndex(val => val[0] === cel[0] && val[1] === cel[1]);
        if (idx === -1){
            this.add(cel);
        } else {
            this.remove(idx);
        }
    }

}
