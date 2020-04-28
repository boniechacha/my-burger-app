import {Order} from "../../../domain/Order";

export const SUBMIT_ORDER_START = 'SUBMIT_ORDER_START';
export const SUBMIT_ORDER_FAIL = 'SUBMIT_ORDER_FAIL';
export const SUBMIT_ORDER_SUCCESS = 'SUBMIT_ORDER_SUCCESS';

export const FETCH_ORDERS_START = 'FETCH_ORDERS_START';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL';

export interface SubmitOrderStart {
    type: typeof SUBMIT_ORDER_START;
}

export interface SubmitOrderSuccess {
    type: typeof SUBMIT_ORDER_SUCCESS;
    payload: {
        order: Order;
    }
}

export interface SubmitOrderFail {
    type: typeof SUBMIT_ORDER_FAIL;
    payload: {
        error: string
    }
}

export interface FetchOrdersStart {
    type: typeof FETCH_ORDERS_START
}

export interface FetchOrdersSuccess {
    type: typeof FETCH_ORDERS_SUCCESS
    payload: {
        orders: Order[]
    }
}

export interface FetchOrdersFail {
    type: typeof FETCH_ORDERS_FAIL,
    payload: {
        error: string
    }
}

export type OrderAction =
    SubmitOrderStart
    | SubmitOrderSuccess
    | SubmitOrderFail
    | FetchOrdersStart
    | FetchOrdersSuccess
    | FetchOrdersFail