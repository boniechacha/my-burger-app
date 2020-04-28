import {IngredientType} from "../../../domain/IngredientType";
import * as Action from './action'
import {BuilderAction} from './action'
import {Reducer} from "redux";

export type BuilderState = { ingredients: Map<IngredientType, number>, ingredientPrices: Map<IngredientType, number>, basePrice: number, price: number }

const initialState: BuilderState = {ingredients: new Map(), ingredientPrices: new Map(), basePrice: 0.0, price: 0.0}

export const builderReducer:Reducer = (state: BuilderState = initialState, action: BuilderAction) => {

    const setBasePrice = (basePrice: number) => {
        return {
            ...state,
            basePrice: basePrice
        }
    }

    const setIngredientPrice = (ingredient: IngredientType, price: number) => {
        const ingrPrc = new Map(state.ingredientPrices)
        ingrPrc.set(ingredient, price)
        return {
            ...state,
            ingredientPrices: ingrPrc
        }
    }

    const initialiseBuilder = () => {

        return {
            ...state,
            ingredients: new Map(),
            price: state.basePrice
        }
    }

    const addIngredient = (type: IngredientType) => {
        let currentCount = getIngredientCount(type)

        let newCount = currentCount + 1;

        let newIngredients = new Map(state.ingredients);
        newIngredients.set(type, newCount);

        let newPrice = state.price + getIngredientUnitPrice(type);

        return {
            ...state,
            ingredients: newIngredients,
            price: newPrice
        }
    }

    const reduceIngredient = (type: IngredientType) => {
        let currentCount = getIngredientCount(type)
        if (currentCount === 0) return;

        let newCount = currentCount - 1;

        let newIngredients = new Map<IngredientType, number>(state.ingredients);
        newIngredients.set(type, newCount);

        let newPrice = state.price - getIngredientUnitPrice(type);

        return {
            ...state,
            ingredients: newIngredients,
            price: newPrice
        }
    }

    const getIngredientCount = (type: IngredientType) => {
        let currentCount = state.ingredients.get(type);
        if (!currentCount) currentCount = 0;

        return currentCount;
    }

    const getIngredientUnitPrice = (type: IngredientType) => {
        let price = state.ingredientPrices.get(type);
        if (!price) price = 0.0;
        return price;
    }

    switch (action.type) {
        case Action.ADD_INGREDIENT:
            return addIngredient(action.payload.ingredient);
        case Action.REDUCE_INGREDIENT:
            return reduceIngredient(action.payload.ingredient);
        case Action.SET_BASE_PRICE:
            return setBasePrice(action.payload.basePrice);
        case Action.SET_INGREDIENT_PRICE:
            return setIngredientPrice(action.payload.ingredient, action.payload.price);
        case Action.INITIALISE_BUILDER:
            return initialiseBuilder();

        default:
            return state;
    }

}