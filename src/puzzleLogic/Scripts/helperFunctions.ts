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



// helpful functions for debugging
export const isUnimplemented = (funcName?: string): void => {
    throw(funcName ?? "a function" + " has not been implemented yet");
}