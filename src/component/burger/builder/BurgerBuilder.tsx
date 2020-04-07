import React from "react";
import Burger from "./burger/Burger";
import {IngredientType} from "../../../IngredientType";
import BuildControlPanel from "./control/BuildControlPanel";
import IngredientContext from "./IngredientContext";

type BurgerBuilderProps = {};
type BurgerBuilderState = { ingredients: Map<IngredientType, number>, price: number };

const BASE_PRICE = 4.0;
const INGREDIENT_PRICE = new Map<IngredientType, number>();
INGREDIENT_PRICE.set(IngredientType.MEET, 2.1);
INGREDIENT_PRICE.set(IngredientType.BACON, 1.2);
INGREDIENT_PRICE.set(IngredientType.CHEESE, 0.5);
INGREDIENT_PRICE.set(IngredientType.SALAD, 0.4);

class BurgerBuilder extends React.Component<BurgerBuilderProps, BurgerBuilderState> {

    state: BurgerBuilderState = {
        ingredients: new Map<IngredientType, number>(),
        price: BASE_PRICE
    };

    render() {

        return (
            <React.Fragment>

                <IngredientContext.Provider value={{
                    ingredients: this.state.ingredients,
                    onAdd: (t) => this.addIngredient(t),
                    onReduce: (t) => this.reduceIngredient(t)
                }}>

                    <Burger/>
                    <BuildControlPanel price={this.state.price}/>

                </IngredientContext.Provider>
            </React.Fragment>
        )
    }

    addIngredient(type: IngredientType) {
        let currentCount = this.getIngredientCount(type)

        let newCount = currentCount + 1;

        let newIngredients = new Map(this.state.ingredients);
        newIngredients.set(type, newCount);

        let newPrice = this.state.price + BurgerBuilder.getIngredientUnitPrice(type);

        this.setState({
            ingredients: newIngredients,
            price: newPrice
        })
    }

    reduceIngredient(type: IngredientType) {
        let currentCount = this.getIngredientCount(type)
        if (currentCount === 0) return;

        let newCount = currentCount - 1;

        let newIngredients = new Map(this.state.ingredients);
        newIngredients.set(type, newCount);

        let newPrice = this.state.price - BurgerBuilder.getIngredientUnitPrice(type);

        this.setState({
            ingredients: newIngredients,
            price: newPrice
        })
    }

    getIngredientCount(type: IngredientType) {
        let currentCount = this.state.ingredients.get(type);
        if (!currentCount) currentCount = 0;

        return currentCount;
    }

    static getIngredientUnitPrice(type: IngredientType) {
        let price = INGREDIENT_PRICE.get(type);
        if (!price) price = 0.0;
        return price;
    }


}

export default BurgerBuilder;