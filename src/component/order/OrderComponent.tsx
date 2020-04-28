import React from "react";
import CSS from './OrderComponent.module.css'
import {Order} from "../../domain/Order";

type OrderProps = { order: Order }

const OrderComponent: React.FC<OrderProps> = props => {
    return (
        <div className={CSS.Order}>
            <p>{Object.keys(props.order.ingredients).map(ing => {
                    return <span key={ing} className={CSS.Ingredient}>{ing} [<b>{props.order.ingredients[ing]}</b>]</span>
                }
            )}
            </p>
            <span>Price: <b>{props.order.price.toFixed(2)}</b></span>
        </div>
    )
}

export default OrderComponent;