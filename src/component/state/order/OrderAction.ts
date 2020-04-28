import {
    FETCH_ORDERS_FAIL,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS,
    FetchOrdersFail,
    FetchOrdersStart,
    FetchOrdersSuccess,
    OrderAction,
    SUBMIT_ORDER_FAIL,
    SUBMIT_ORDER_START,
    SUBMIT_ORDER_SUCCESS,
    SubmitOrderFail,
    SubmitOrderStart,
    SubmitOrderSuccess
} from "./OrderActionType";
import {Order} from "../../../domain/Order";
import {Dispatch} from "redux";
import OrderAxios from "../../../service/order-axios";
import {OrderData} from "../../../domain/OrderData";

export const submitOrderStart = (): SubmitOrderStart => {
    return {
        type: SUBMIT_ORDER_START
    }
}

export const submitOrderSuccess = (order: Order): SubmitOrderSuccess => {
    return {
        type: SUBMIT_ORDER_SUCCESS,
        payload: {
            order: order
        }
    }
}

export const submitOrderFail = (error: string): SubmitOrderFail => {
    return {
        type: SUBMIT_ORDER_FAIL,
        payload: {
            error: error
        }
    }
}

export const submitOrder = (data: OrderData) => {
    return (dispatch: Dispatch<OrderAction>) => {
        dispatch(submitOrderStart());

        OrderAxios.post("/order.json", data)
            .then(response => {

                const order = {
                    ...data,
                    id: response.data.name
                }
                dispatch(submitOrderSuccess(order))
            })
            .catch(error => {
                dispatch(submitOrderFail(error))
            });
    }
}

export const fetchOrdersStart = (): FetchOrdersStart => {
    return {
        type: FETCH_ORDERS_START,
    }
}

export const fetchOrdersSuccess = (orders: Order[]): FetchOrdersSuccess => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        payload: {
            orders: orders
        }
    }
}

export const fetchOrdersFail = (error: string): FetchOrdersFail => {
    return {
        type: FETCH_ORDERS_FAIL,
        payload: {
            error: error
        }
    }
}

export const fetchOrders = () => {
    return (dispatch: Dispatch<OrderAction>) => {
        dispatch(fetchOrdersStart());

        OrderAxios.get('/order.json')
            .then(response => {
                const orders = Object.keys(response.data).map(key => {
                    const order = response.data[key] as Order;
                    order.id = key;
                    return order;
                });

                dispatch(fetchOrdersSuccess(orders))
            }).catch(error => {
            dispatch(fetchOrdersFail(error))
        });

    }
}