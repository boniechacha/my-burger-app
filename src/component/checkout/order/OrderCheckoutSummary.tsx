import React from "react";
import {IngredientType} from "../../../domain/IngredientType";
import Button from "../../util/button/Button";
import {Runnable} from "../../../util/functions";

type OrderSummaryProps = {
    price: number;
    ingredients: Map<IngredientType, number>;
    onCancel: Runnable ;
    onProceed:Runnable
}

const OrderCheckoutSummary: React.FC<OrderSummaryProps> = props => {

    let ingredientsLIElements = Array.from(props.ingredients.keys()).map((ingr) => {
        let count = props.ingredients.get(ingr);
        if(count == null) count = 0;

        return (
            <li key={ingr}>
                <span>{ingr} : {count}</span>
            </li>
        );
    });

    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul style={{listStyle:"none"}}>
                {ingredientsLIElements}
            </ul>

            <p><strong>Total Price : {props.price.toFixed(2)}</strong></p>
            <h3>Continue Checkout?</h3>
            <Button type={'Danger'} clicked={props.onCancel}>Cancel</Button>
            <Button type={'Success'} clicked={props.onProceed}>Proceed</Button>
        </React.Fragment>
    )
}

export default OrderCheckoutSummary;