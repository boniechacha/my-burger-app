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
import {connect} from "react-redux";
import {RootState} from "../../state/reducer";
import {addIngredient, initialiseBuilder, reduceIngredient, setBasePrice, setIngredientPrice} from "./action";

interface BurgerBuilderProps extends RouteComponentProps, MapStateProps, MapDispatchProps {};

type BurgerBuilderState = {
    purchasing: boolean,
    settingUp: boolean,
    failed: boolean,
    error: string
};

class BurgerBuilder extends React.Component<BurgerBuilderProps, BurgerBuilderState> {

    state: BurgerBuilderState = {
        purchasing: false,
        settingUp: true,
        failed: false,
        error: ''
    };

    componentDidMount() {
        OrderAxios.get("/price.json")
            .then(response => {

                    this.props.initialiseIngredientPrice(MEAT, +response.data[MEAT.toUpperCase()]);
                    this.props.initialiseIngredientPrice(BACON, +response.data[BACON.toUpperCase()]);
                    this.props.initialiseIngredientPrice(CHEESE, +response.data[CHEESE.toUpperCase()]);
                    this.props.initialiseIngredientPrice(SALAD, +response.data[SALAD.toUpperCase()]);
                    this.props.initialiseBasePrice(+response.data['BASE']);

                    this.setState({settingUp: false})
                    this.props.initialiseBuilder();
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

                        <OrderCheckoutSummary price={this.props.price}
                                              ingredients={this.props.ingredients}
                                              onCancel={() => this.orderCancel()}
                                              onProceed={() => this.orderCheckout()}/>

                    </Modal>

                    <Burger ingredients={this.props.ingredients}/>

                    <BuildControlPanel price={this.props.price}
                                       ingredients={this.props.ingredients}
                                       onOrder={() => this.showOrderSummary()}
                                       onAdd={(t) => this.props.addIngredient(t)}
                                       onReduce={(t) => this.props.reduceIngredient(t)}/>

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
        this.props.history.push('/checkout');
    }

    orderCancel = () => {
        this.setState({
            purchasing: false
        })
    }

}

interface MapStateProps {
    ingredients: Map<IngredientType, number>;
    price: number;
}

interface MapDispatchProps {
    initialiseBasePrice(basePrice: number): void;

    initialiseIngredientPrice(ingredient: IngredientType, price: number): void;

    addIngredient(ingredient: IngredientType): void;

    reduceIngredient(ingredient: IngredientType): void;

    initialiseBuilder(): void;
}

const mapStateToProps = (state: RootState): MapStateProps => {
    return {
        ingredients: state.builder.ingredients,
        price: state.builder.price
    };
}

const mapDispatchToProps: MapDispatchProps = {
    addIngredient: (ingredient: IngredientType) => addIngredient(ingredient),
    reduceIngredient: (ingredient: IngredientType) => reduceIngredient(ingredient),
    initialiseBasePrice: (basePrice: number) => setBasePrice(basePrice),
    initialiseIngredientPrice: (ingredient: IngredientType, price: number) => setIngredientPrice(ingredient,price),
    initialiseBuilder: () => initialiseBuilder()
}


export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);