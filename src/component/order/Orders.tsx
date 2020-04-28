import React from "react";
import CSS from './Orders.module.css'
import OrderAxios from "../../service/order-axios";
import {Order} from "../../domain/Order";
import OrderComponent from "./OrderComponent";
import ErrorWrapper from "../util/error/ErrorWrapper";
import LoadingComponent from "../util/spinner/LoadingComponent";
import {OrdersProps, OrdersReduxDispatchProps, OrdersReduxStateProps, OrdersState} from "./OrdersTypes";
import {RootState} from "../state/reducer";
import {fetchOrders} from "../state/order/OrderAction";
import {connect} from "react-redux";

class Orders extends React.Component<OrdersProps, OrdersState> {

    componentDidMount() {
       this.props.fetchOrders();
    }

    render() {
        return (
            <LoadingComponent loading={this.props.fetchingOrders}>
                <ErrorWrapper error={this.props.ordersFetchingError}>
                    <div className={CSS.Orders}>
                        {this.props.orders.map(order => <OrderComponent key={order.id} order={order}/>)}
                    </div>
                </ErrorWrapper>
            </LoadingComponent>
        );
    }
}

const mapStateToProps = (state: RootState): OrdersReduxStateProps => {
    return {
        orders: state.order.orders,
        ordersFetchingError: state.order.ordersFetchingError,
        fetchingOrders: state.order.fetchingOrders
    }
}

const mapDispatchToProps: OrdersReduxDispatchProps = {
    fetchOrders: () => fetchOrders()
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders);