// export enum IngredientType {
//     CHEESE = 'Cheese', MEAT = 'Meat', SALAD = 'Salad', BACON = 'Bacon'
// }
//
// export function toIngredientType(type:string){
//     switch (type) {
//         case IngredientType.CHEESE: return IngredientType.CHEESE;
//         case IngredientType.MEAT: return IngredientType.MEAT;
//         case IngredientType.SALAD: return IngredientType.SALAD;
//         case IngredientType.BACON: return IngredientType.BACON;
//         default: throw new Error(type +' is not an IngredientType')
//     }
// }

export const CHEESE = 'Cheese'
export const MEAT = 'Meat'
export const SALAD = 'Salad'
export const BACON = 'Bacon'

export type IngredientType = typeof CHEESE | typeof MEAT | typeof SALAD | typeof BACON;