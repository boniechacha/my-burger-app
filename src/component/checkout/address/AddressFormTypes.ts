import Form from "./Form";
import {RouteComponentProps} from "react-router";
import {IngredientType} from "../../../domain/IngredientType";
import {Consumer} from "../../../util/functions";
import {OrderData} from "../../../domain/OrderData";

export interface AddressFormState {
    submitting: boolean,
    valid: boolean,
    form: Form
}

export interface AddressFormProps extends RouteComponentProps, AddressFormReduxStateProps,AddressFormReduxDispatchProps {}

export interface AddressFormReduxStateProps {
    ingredients: Map<IngredientType, number>;
    price: number;
    orderSubmissionError: string,
    submittingOrder: boolean,
}

export interface AddressFormReduxDispatchProps {
    submitOrder:Consumer<OrderData>
}