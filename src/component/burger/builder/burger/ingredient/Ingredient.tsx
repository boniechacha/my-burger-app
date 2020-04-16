import React from "react";
import {IngredientType} from "../../../../../domain/IngredientType";
import IngredientCSS from './Ingredient.module.css'

type IngredientProps = { type: IngredientType }
const Ingredient: React.FC<IngredientProps> = (props) => <div className={IngredientCSS[props.type]}></div>

export default Ingredient;