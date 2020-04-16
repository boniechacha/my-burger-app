import React from "react";
import TopBread from "./ingredient/TopBread";
import BurgerCSS from './Burger.module.css'
import BottomBread from "./ingredient/BottomBread";
import Ingredient from "./ingredient/Ingredient";
import {IngredientType} from "../../../../domain/IngredientType";


function convertIngredientsToNodes(ingredients: Map<IngredientType, number>) {
    const content: React.ReactNode[] = [];

    ingredients.forEach((value, key) => {
        for (let i = 0; i < value; i++) {
            content.push(
                <Ingredient type={key} key={key + i}/>
            );
        }
    });

    if (content.length === 0) {
        content.push(
            <p key='0'><em>Please start adding ingredients</em></p>
        );
    }

    return content;
}

type BurgerProps = { ingredients: Map<IngredientType, number> }
const Burger: React.FC<BurgerProps> = (props) => {

    return (
        <div className={BurgerCSS.Burger}>
            <TopBread/>
            {convertIngredientsToNodes(props.ingredients)}
            <BottomBread/>
        </div>
    );
}

export default Burger;