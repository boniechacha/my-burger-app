import React, {ReactPropTypes} from "react";
import CSS from './Orders.module.css'
import OrderAxios from "../../service/order-axios";
import {Order} from "../../domain/Order";
import OrderComponent from "./OrderComponent";
import ErrorWrapper from "../util/error/ErrorWrapper";
import LoadingComponent from "../util/spinner/LoadingComponent";

type OrdersState = { orders: Order[], error: string, loading: boolean }

interface OrdersProps extends ReactPropTypes {
}

class Orders extends React.Component<OrdersProps, OrdersState> {

    state = {
        orders: [] as Order[],
        error: '',
        loading: false
    }

    componentDidMount() {
        this.setState({loading: true, error: ''})
        OrderAxios.get('/order.json')
            .then(response => {
                const orders = Object.keys(response.data).map(key => response.data[key] as Order)
                this.setState({orders: orders, error: ''})
            }).catch(error => {
            this.setState({error: error})
        }).finally(() => this.setState({loading: false}));
    }

    render() {
        return (
            <LoadingComponent loading={this.state.loading}>
                <ErrorWrapper error={this.state.error.toString()}>
                    <div className={CSS.Orders}>
                        {this.state.orders.map(order => <OrderComponent key={order.id} order={order}/>)}
                    </div>
                </ErrorWrapper>
            </LoadingComponent>
        );
    }
}

export default Orders;