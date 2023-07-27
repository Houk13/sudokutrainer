type celValue = (number | "");

export const isValidDigitNtoM = (num: celValue, M: number, N: number = 1): boolean => {
    return !(num === "" || num < N || num > M || num % 1 !== 0);
}

export const isSetNtoM = (set: celValue[], M: number, N:number = 1): boolean => {
    if (set.length !== M - N + 1) return false;
    const bitSum = Math.pow(2, M) - Math.pow(2, N - 1);

    return bitSum === set.reduce(
        (together: number, val: celValue) => 
            together += isValidDigitNtoM(val, M, N) ? Math.pow(2, val as number - 1) : bitSum + 1
    , 0);
}

export const getSudokuBox = (grid: celValue[][], box: number) : celValue[] => {
    const boxArray: celValue[] = [];
        const startRow = 3 * Math.floor(box / 3);
        const startCol = 3 * ((box - 1) % 3);
        for (let row = startRow; row !== startRow + 3; row++){
            for (let col = startCol; col !== startCol + 3; row++){
                boxArray.push(grid[row][col]);
            }
        }
    return boxArray;
}
