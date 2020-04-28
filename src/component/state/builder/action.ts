import {IngredientType} from "../../../domain/IngredientType";

export const INITIALISE_BUILDER = 'INITIALISE_BUILDER';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REDUCE_INGREDIENT = 'REDUCE_INGREDIENT';
export const SET_BASE_PRICE = 'SET_BASE_PRICE';
export const SET_INGREDIENT_PRICE = 'SET_INGREDIENT_PRICE';

export interface InitialiseBuilderAction {
    type: typeof INITIALISE_BUILDER;
}


export interface AddIngredientAction {
    type: typeof ADD_INGREDIENT;
    payload: {
        ingredient: IngredientType;
    }
}

export interface ReduceIngredientAction {
    type: typeof REDUCE_INGREDIENT;
    payload: {
        ingredient: IngredientType;
    }
}

export interface SetBasePriceAction {
    type: typeof SET_BASE_PRICE;
    payload: {
        basePrice: number;
    }
}

export interface SetIngredientPriceAction {
    type: typeof SET_INGREDIENT_PRICE;
    payload: {
        ingredient:IngredientType;
        price: number;
    }
}

export type BuilderAction =
    InitialiseBuilderAction
    | AddIngredientAction
    | ReduceIngredientAction
    | SetBasePriceAction
    | SetIngredientPriceAction;