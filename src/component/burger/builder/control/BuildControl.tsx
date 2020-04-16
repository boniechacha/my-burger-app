import React from 'react';
import {IngredientType} from "../../../../domain/IngredientType";
import BuildControlCSS from './BuildControl.module.css';
import {Consumer} from "../../../../util/functions";

type BuildControlProps = { ingredient: IngredientType; count?: number; onReduce: Consumer<IngredientType>; onAdd: Consumer<IngredientType> };

const BuildControl: React.FC<BuildControlProps> = (props) => {

    const hasIngredient = props.count != null && props.count > 0;

    return (
        <div className={BuildControlCSS.BuildControl}>
            <div className={BuildControlCSS.Label}>{props.ingredient.toString()}</div>
            <button className={BuildControlCSS.Less}
                    disabled={!hasIngredient}
                    onClick={() => props.onReduce(props.ingredient)}>
                Less
            </button>
            <button className={BuildControlCSS.More}
                    onClick={() => props.onAdd(props.ingredient)}>
                More
            </button>
        </div>
    )
}


export default BuildControl