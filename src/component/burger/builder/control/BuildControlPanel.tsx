import React from 'react';
import BuildControlPanelCSS from './BuildControlPanel.module.css';
import BuildControl from "./BuildControl";
import {IngredientType} from "../../../../IngredientType";
import {Consumer, Runnable} from "../../../../util/functions";

type BuildControlPanelProps = {
    price: number;
    ingredients: Map<IngredientType, number>;
    onOrder: Runnable
    onReduce: Consumer<IngredientType>;
    onAdd: Consumer<IngredientType>
}

function countIngredients(ingredients: Map<IngredientType, number>) {
    return Array.from(ingredients.values()).reduce((s, c) => s + c, 0);
}

const BuildControlPanel: React.FC<BuildControlPanelProps> = (props) => {

    return (
        <div className={BuildControlPanelCSS.BuildControlPanel}>
            <div>
                <p>
                    Price : <strong>{props.price.toFixed(2)}</strong>
                </p>
            </div>

            <BuildControl ingredient={IngredientType.MEET}
                          count={props.ingredients.get(IngredientType.MEET)}
                          onAdd={props.onAdd}
                          onReduce={props.onReduce}/>
            <BuildControl ingredient={IngredientType.BACON}
                          count={props.ingredients.get(IngredientType.BACON)}
                          onAdd={props.onAdd}
                          onReduce={props.onReduce}/>
            <BuildControl ingredient={IngredientType.CHEESE}
                          count={props.ingredients.get(IngredientType.CHEESE)}
                          onAdd={props.onAdd}
                          onReduce={props.onReduce}/>
            <BuildControl ingredient={IngredientType.SALAD}
                          count={props.ingredients.get(IngredientType.SALAD)}
                          onAdd={props.onAdd}
                          onReduce={props.onReduce}/>

            <button className={BuildControlPanelCSS.OrderButton}
                    disabled={countIngredients(props.ingredients) <= 0}
                    onClick={() => props.onOrder()}>Order Now</button>
        </div>
    )
}

export default BuildControlPanel;