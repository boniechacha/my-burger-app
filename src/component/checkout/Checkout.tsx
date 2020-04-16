import React from "react";
import OrderCheckoutPreview from "./order/OrderCheckoutPreview";
import {IngredientType} from "../../domain/IngredientType";
import {Route, RouteComponentProps} from "react-router";
import AddressForm from "./address/AddressForm";

interface CheckoutProps extends RouteComponentProps {
}

type CheckoutState = { ingredients: Map<IngredientType, number> }

class Checkout extends React.Component<CheckoutProps, CheckoutState> {

    state = {
        ingredients: new Map()
    }

    componentDidMount() {
        const ingredients = new Map<IngredientType, number>();
        new URLSearchParams(this.props.location.search).forEach((value, key) => {
            if(key !=='price') ingredients.set(key as IngredientType, +value)
        })

        this.setState({ingredients: ingredients})
    }

    render() {
        return (
            <div>
                <OrderCheckoutPreview ingredients={this.state.ingredients}
                                      cancel={() => this.props.history.goBack()}
                                      proceed={() => this.proceed()}/>
                <Route path={this.props.match.path + '/address'} component={AddressForm}/>
            </div>
        );
    }

    private proceed() {
        this.props.history.push({
            pathname:"/checkout/address",
            search:this.props.location.search
        })
    }
}

export default Checkout;