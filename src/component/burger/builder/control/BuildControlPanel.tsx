import React from 'react';
import BuildControlPanelCSS from './BuildControlPanel.module.css';
import BuildControl from "./BuildControl";
import {IngredientType} from "../../../../IngredientType";

type BuildControlPanelProps = { price: number }
const BuildControlPanel: React.FC<BuildControlPanelProps> = (props) => {

    return (
        <div className={BuildControlPanelCSS.BuildControlPanel}>
            <div>
                <p>
                    Price : <strong>{props.price.toFixed(2)}</strong>
                </p>
            </div>

            <BuildControl ingredient={IngredientType.MEET}/>
            <BuildControl ingredient={IngredientType.BACON}/>
            <BuildControl ingredient={IngredientType.CHEESE}/>
            <BuildControl ingredient={IngredientType.SALAD}/>
        </div>
    )
}

export default BuildControlPanel;