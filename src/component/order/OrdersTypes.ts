import {Order} from "../../domain/Order";
import {ReactPropTypes} from "react";
import {Runnable} from "../../util/functions";

export type OrdersState = { }

export interface OrdersProps extends ReactPropTypes ,OrdersReduxStateProps,OrdersReduxDispatchProps{
}

export interface OrdersReduxStateProps {
    orders:Order[],
    ordersFetchingError:string,
    fetchingOrders:boolean
}

export interface OrdersReduxDispatchProps {
    fetchOrders:Runnable
}