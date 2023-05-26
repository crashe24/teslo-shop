import { ISizes } from "./IProduct";
import { IUser } from "./IUser";

export interface IOrder {
    _id?            : string;
    user            : IUser | string;
    orderItems      : IOrderItem[];
    shippingAddress : ShippingAdress;
    paymentResult   : string;
    numberOfItems   : number;
    subTotal        : number;
    tax             : number;
    total           : number;
    isPaid          : boolean;
    paidAt?         : string;
}

export interface IOrderItem {
    _id        : string;
    title      : string;
    size       : ISizes;
    quantity   : number;
    slug       : string;
    image      : string;
    price      : number;
    gender     : string;
}

export interface ShippingAdress {
    firstName  : string;
    lastName   : string;
    address    : string;
    address2   : string;
    zip        : string;
    city       : string;
    country    : string;
    phone      : string;
}