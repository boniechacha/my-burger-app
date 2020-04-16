import React from "react";
import {IngredientType} from "../../../domain/IngredientType";

type IngredientContextType = { ingredients: Map<IngredientType, number>; onAdd: (type: IngredientType) => void; onReduce: (type: IngredientType) => void }

const IngredientContext = React.createContext<IngredientContextType>({
    ingredients: new Map(),
    onAdd: t => {},
    onReduce: t => {}
});

export default IngredientContext;