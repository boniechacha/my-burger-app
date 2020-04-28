import {Order} from "../../../domain/Order";

export type OrderState = {
    submittingOrder:boolean;
    orderSubmissionError:string;
    fetchingOrders:boolean;
    ordersFetchingError:string;
    orders:Order[];
}