import React from 'react';
import {IngredientType} from "../../../../IngredientType";
import IngredientContext from "../IngredientContext";
import BuildControlCSS from './BuildControl.module.css';

type BuildControlProps = { ingredient: IngredientType };

const BuildControl: React.FC<BuildControlProps> = (props) => {
    return (
        <IngredientContext.Consumer>
            {context => {
                const ingredientCount = context.ingredients.get(props.ingredient);
                const hasIngredient = ingredientCount != null && ingredientCount > 0;

                return (
                    <div className={BuildControlCSS.BuildControl}>
                        <div className={BuildControlCSS.Label}>{props.ingredient.toString()}</div>
                        <button className={BuildControlCSS.Less}
                                disabled={!hasIngredient}
                                onClick={() => context.onReduce(props.ingredient)}>
                            Less
                        </button>
                        <button className={BuildControlCSS.More}
                                onClick={() => context.onAdd(props.ingredient)}>
                            More
                        </button>
                    </div>
                )
            }
            }

        </IngredientContext.Consumer>

    )
}

export default BuildControl