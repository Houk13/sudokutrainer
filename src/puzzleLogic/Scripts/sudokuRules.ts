import { isSetNtoM } from "./helperFunctions";

export const isSet1to9 = (set: (number | "")[]): boolean => isSetNtoM(set, 9);
