import React from "react";
import Burger from "./burger/Burger";
import {IngredientType} from "../../../IngredientType";
import BuildControlPanel from "./control/BuildControlPanel";
import Modal from "../../modal/Modal";
import OrderSummary from "../../order/OrderSummary";
import OrderAxios from "../../../service/order-axios";
import LoadingComponent from "../../spinner/LoadingComponent";
import ErrorWrapper from "../../error/ErrorWrapper";

type BurgerBuilderProps = {};
type BurgerBuilderState = {
    ingredients: Map<IngredientType, number>,
    price: number,
    purchasing: boolean,
    submittingOrder: boolean,
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
        submittingOrder: false,
        settingUp: true,
        failed: false,
        error: ''
    };

    componentDidMount() {
        OrderAxios.get("/price.json")
            .then(response => {
                    BurgerBuilder.BASE_PRICE = +response.data['BASE'];
                    BurgerBuilder.INGREDIENT_PRICE.set(IngredientType.MEET, +response.data[IngredientType.MEET.toUpperCase()]);
                    BurgerBuilder.INGREDIENT_PRICE.set(IngredientType.BACON, +response.data[IngredientType.BACON.toUpperCase()]);
                    BurgerBuilder.INGREDIENT_PRICE.set(IngredientType.CHEESE, +response.data[IngredientType.CHEESE.toUpperCase()]);
                    BurgerBuilder.INGREDIENT_PRICE.set(IngredientType.SALAD, +response.data[IngredientType.SALAD.toUpperCase()]);


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
                           onClosed={() => this.purchasingHandler(false)}>

                        <LoadingComponent loading={this.state.submittingOrder}>
                            <OrderSummary price={this.state.price}
                                          ingredients={this.state.ingredients}
                                          onCancel={() => this.purchasingHandler(false)}
                                          onProceed={() => this.processOrder()}/>
                        </LoadingComponent>

                    </Modal>

                    <Burger ingredients={this.state.ingredients}/>

                    <BuildControlPanel price={this.state.price}
                                       ingredients={this.state.ingredients}
                                       onOrder={() => this.purchasingHandler(true)}
                                       onAdd={(t) => this.addIngredient(t)}
                                       onReduce={(t) => this.reduceIngredient(t)}/>

                </LoadingComponent>
            </ErrorWrapper>
        )
    }


    setError = (error: string) => {
        this.setState({error: error})
    }

    submittingOrder = (submitting: boolean) => {
        this.setState({submittingOrder: submitting})
    }

    processOrder = () => {
        this.setError('')
        this.submittingOrder(true);

        const order = {
            ingredients: Object.fromEntries(this.state.ingredients),
            price: this.state.price
        };

        OrderAxios.post("/order.json", order)
            .then(response => {
            })
            .catch(error => {
                this.setError(error.toString());
                console.log("error :" + error)
            })
            .finally(() => {
                this.submittingOrder(false);
                this.purchasingHandler(false)
            })
    }

    purchasingHandler = (purchasing: boolean) => {
        this.setState({
            purchasing: purchasing
        })
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