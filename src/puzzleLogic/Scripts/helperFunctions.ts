export const isValidDigitNtoM = (num: (number | ""), M: number, N: number = 1): boolean => {
    return !(num === "" || num < N || num > M || num % 1 !== 0);
}

export const isSetNtoM = (set: (number | "")[], M: number, N:number = 1): boolean => {
    if (set.length !== M - N + 1) return false;
    const bitSum = Math.pow(2, M) - Math.pow(2, N - 1);

    return bitSum === set.reduce(
        (together: number, val: (number | "")) => 
            together += isValidDigitNtoM(val, M, N) ? Math.pow(2, val as number - 1) : bitSum + 1
    , 0);
}