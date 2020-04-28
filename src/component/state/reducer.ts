import {combineReducers, Reducer} from "redux";
import {orderReducer} from "./order/OrderReducer";
import {builderReducer} from "./builder/builder";


export const reducer: Reducer = combineReducers({
    builder: builderReducer,
    order:orderReducer
})

export type RootState=ReturnType<typeof reducer>