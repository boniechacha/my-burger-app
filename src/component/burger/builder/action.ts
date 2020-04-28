import {IngredientType} from "../../../domain/IngredientType";
import {
    ADD_INGREDIENT,
    AddIngredientAction,
    INITIALISE_BUILDER,
    InitialiseBuilderAction,
    REDUCE_INGREDIENT,
    ReduceIngredientAction,
    SET_BASE_PRICE,
    SET_INGREDIENT_PRICE,
    SetBasePriceAction,
    SetIngredientPriceAction
} from "../../state/builder/action";

export const addIngredient = (ingredient: IngredientType): AddIngredientAction => {
    return {
        type: ADD_INGREDIENT,
        payload: {ingredient: ingredient}
    }
};

export const reduceIngredient = (ingredient: IngredientType): ReduceIngredientAction => {
    return {
        type: REDUCE_INGREDIENT,
        payload: {ingredient: ingredient}
    }
}

export const setBasePrice = (basePrice: number): SetBasePriceAction => {
    return {
        type: SET_BASE_PRICE,
        payload: {basePrice: basePrice}
    }
}

export const setIngredientPrice = (ingredient: IngredientType, price: number): SetIngredientPriceAction => {
    return {
        type: SET_INGREDIENT_PRICE,
        payload: {ingredient: ingredient, price: price}
    }
}

export const initialiseBuilder = ():InitialiseBuilderAction => {
    return {
        type: INITIALISE_BUILDER
    }
}