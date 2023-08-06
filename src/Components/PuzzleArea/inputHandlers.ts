export function isAlphaNumeric(str: string): boolean {
    return (str.match(/^[0-9a-zA-Z]$/) !== null);
}
export function isNumeric(str: string): boolean {
    return (str.match(/^[0-9]+$/) !== null);
}

