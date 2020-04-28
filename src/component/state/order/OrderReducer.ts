import {OrderState} from "./OrderState";
import {OrderAction} from "./OrderActionType";
import {Reducer} from "redux";
import {Order} from "../../../domain/Order";

const initialState: OrderState = {
    orders: [],
    orderSubmissionError: '',
    submittingOrder: false,
    fetchingOrders: false,
    ordersFetchingError: ''
}

export const orderReducer: Reducer = (state: OrderState = initialState, action: OrderAction): OrderState => {

    const onSubmitStart = () => {
        return {
            ...state,
            submittingOrder: true,
            orderSubmissionError: ''
        }
    };

    const onSubmitSuccess = (order: Order) => {
        return {
            ...state,
            orders: state.orders.concat(order),
            submittingOrder: false
        }
    };

    const onSubmitFail = (error: string) => {
        return {
            ...state,
            orderSubmissionError: error
        }
    }

    const onFetchingOrdersStart = () => {
        return {
            ...state,
            fetchingOrders: true,
            ordersFetchingError: ''
        }
    }

    const onFetchingOrdersSuccess = (orders:Order[]) => {
        return {
            ...state,
            orders:orders,
            fetchingOrders: false
        }
    }

    const onFetchingOrdersFail = (error:string) => {
        return {
            ...state,
            ordersFetchingError: error,
            fetchingOrders: false
        }
    }

    switch (action.type) {
        case "SUBMIT_ORDER_START":
            return onSubmitStart();
        case "SUBMIT_ORDER_SUCCESS":
            return onSubmitSuccess(action.payload.order);
        case "SUBMIT_ORDER_FAIL":
            return onSubmitFail(action.payload.error)
        case "FETCH_ORDERS_FAIL":
            return onFetchingOrdersFail(action.payload.error)
        case "FETCH_ORDERS_START":
            return onFetchingOrdersStart()
        case "FETCH_ORDERS_SUCCESS":
            return onFetchingOrdersSuccess(action.payload.orders)
        default:
            return state;
    }

}