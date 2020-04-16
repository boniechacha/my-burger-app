import React from "react";
import Burger from "./burger/Burger";
import {BACON, CHEESE, IngredientType, MEAT, SALAD} from "../../../domain/IngredientType";
import BuildControlPanel from "./control/BuildControlPanel";
import Modal from "../../util/modal/Modal";
import OrderCheckoutSummary from "../../checkout/order/OrderCheckoutSummary";
import OrderAxios from "../../../service/order-axios";
import LoadingComponent from "../../util/spinner/LoadingComponent";
import ErrorWrapper from "../../util/error/ErrorWrapper";
import {RouteComponentProps} from "react-router";
import {convertMapToQuery} from "../../../util/functions";

interface BurgerBuilderProps extends RouteComponentProps {
};
type BurgerBuilderState = {
    ingredients: Map<IngredientType, number>,
    price: number,
    purchasing: boolean,
    settingUp: boolean,
    failed: boolean,
    error: string
};


class BurgerBuilder extends React.Component<BurgerBuilderProps, BurgerBuilderState> {
    static BASE_PRICE: number;

    static INGREDIENT_PRICE = new Map<IngredientType, number>();

    state: BurgerBuilderState = {
        ingredients: new Map<IngredientType, number>(),
        price: 0.0,
        purchasing: false,
        settingUp: true,
        failed: false,
        error: ''
    };

    componentDidMount() {
        OrderAxios.get("/price.json")
            .then(response => {
                    BurgerBuilder.BASE_PRICE = +response.data['BASE'];
                    BurgerBuilder.INGREDIENT_PRICE.set(MEAT, +response.data[MEAT.toUpperCase()]);
                    BurgerBuilder.INGREDIENT_PRICE.set(BACON, +response.data[BACON.toUpperCase()]);
                    BurgerBuilder.INGREDIENT_PRICE.set(CHEESE, +response.data[CHEESE.toUpperCase()]);
                    BurgerBuilder.INGREDIENT_PRICE.set(SALAD, +response.data[SALAD.toUpperCase()]);


                    this.setState({price: BurgerBuilder.BASE_PRICE, settingUp: false})
                }
            )
            .catch(error => {
                this.setError(error.toString())
                this.setState({failed: true})
            })

    }

    render() {

        if (this.state.failed) return <h1>Sorry! Application failed to load.</h1>
        return (
            <ErrorWrapper error={this.state.error}>

                <LoadingComponent loading={this.state.settingUp}>

                    <Modal show={this.state.purchasing}
                           onClosed={() => this.orderCancel()}>

                        <OrderCheckoutSummary price={this.state.price}
                                              ingredients={this.state.ingredients}
                                              onCancel={() => this.orderCancel()}
                                              onProceed={() => this.orderCheckout()}/>

                    </Modal>

                    <Burger ingredients={this.state.ingredients}/>

                    <BuildControlPanel price={this.state.price}
                                       ingredients={this.state.ingredients}
                                       onOrder={() => this.showOrderSummary()}
                                       onAdd={(t) => this.addIngredient(t)}
                                       onReduce={(t) => this.reduceIngredient(t)}/>

                </LoadingComponent>

            </ErrorWrapper>
        )
    }


    setError = (error: string) => {
        this.setState({error: error})
    }

    showOrderSummary = () => {
        this.setState({
            purchasing: true
        })
    }

    orderCheckout = () => {

        this.props.history.push({
            pathname: '/checkout',
            search:this.convertIngredientsToQuery()
        });
    }

    orderCancel = () => {
        this.setState({
            purchasing: false
        })
    }

    convertIngredientsToQuery = () => {
        const queryMap = new Map<string,string>().set('price',this.state.price.toFixed(2).toString());
        this.state.ingredients.forEach((value, key) => queryMap.set(key.toString(),value.toString()))

        return convertMapToQuery(queryMap);

        // return Array.from(this.state.ingredients.keys())
        //     .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(this.state.ingredients.get(key)!)}`)
        //     .join('&')
    }

    addIngredient = (type: IngredientType) => {
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

    reduceIngredient = (type: IngredientType) => {
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

    getIngredientCount = (type: IngredientType) => {
        let currentCount = this.state.ingredients.get(type);
        if (!currentCount) currentCount = 0;

        return currentCount;
    }

    static getIngredientUnitPrice(type: IngredientType) {
        let price = BurgerBuilder.INGREDIENT_PRICE.get(type);
        if (!price) price = 0.0;
        return price;
    }
}

export default BurgerBuilder;