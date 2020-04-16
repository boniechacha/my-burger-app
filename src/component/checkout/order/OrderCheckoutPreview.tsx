import React from "react";
import Burger from "../../burger/builder/burger/Burger";
import {IngredientType} from "../../../domain/IngredientType";
import Button from "../../util/button/Button";
import CSS from './OrderCheckoutPreview.module.css'
import {Runnable} from "../../../util/functions";

type OrderCheckoutSummaryProps = {ingredients:Map<IngredientType,number>,cancel:Runnable,proceed:Runnable}

const OrderCheckoutPreview: React.FC<OrderCheckoutSummaryProps> = (props) => {
    return (
        <div className={CSS.OrderCheckoutSummary}>
            <h1>It looks delicious</h1>
            <Burger ingredients={props.ingredients}/>

            <Button type='Danger' clicked={()=> props.cancel()}>Cancel</Button>
            <Button type='Success' clicked={()=>props.proceed()}>Proceed</Button>
        </div>
    )
}

export default OrderCheckoutPreview;