import React from "react";
import OrderCheckoutPreview from "./order/OrderCheckoutPreview";
import {IngredientType} from "../../domain/IngredientType";
import {Route, RouteComponentProps} from "react-router";
import AddressForm from "./address/AddressForm";
import {RootState} from "../state/reducer";
import {connect} from "react-redux";

interface CheckoutProps extends RouteComponentProps,MapStateProps {}

class Checkout extends React.Component<CheckoutProps> {

    render() {
        return (
            <div>
                <OrderCheckoutPreview ingredients={this.props.ingredients}
                                      cancel={() => this.props.history.goBack()}
                                      proceed={() => this.proceed()}/>
                <Route path={this.props.match.path + '/address'} component={AddressForm}/>
            </div>
        );
    }

    private proceed() {
        this.props.history.push("/checkout/address")
    }
}


interface MapStateProps{ ingredients: Map<IngredientType, number> }

const mapStateToProps = (state: RootState): MapStateProps=> {
    return {
        ingredients: state.builder.ingredients
    };
}

export default connect(mapStateToProps)(Checkout);