// export type Options<Type> = ({value: Type, available: (true | false)})[]
export type Options<T> = Map<T, boolean | undefined>

// export interface Options<Type> extends Array<Type> {
//     optionName: string;
// }

// export default class Options<Type>{
//     options: Type[];

//     constructor(options: Type[]){
//         this.options = options
//     }
// }