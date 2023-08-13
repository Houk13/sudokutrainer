export function isAlphaNumeric(str: string): boolean {
    return (str.match(/^[0-9a-zA-Z]$/) !== null);
}
export function isNumeric(str: string): boolean {
    return (str.match(/^[0-9]+$/) !== null);
}
export function isAlphabetic(str: string): boolean {
    return (str.match(/^[a-zA-Z]+$/) !== null);
}
export function isDirection(str: string): boolean {
    return (str === "ArrowUp" || str === "ArrowDown" || str === "ArrowLeft" || str === "ArrowRight");
}

