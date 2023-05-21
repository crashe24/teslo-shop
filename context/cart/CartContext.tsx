
import { ICart } from '@/interfaces';
import { createContext } from 'react';
import { ShippingAdress } from './CartProvider';
export interface ContextProps {
      isLoaded:boolean;
      cart: ICart[];
      numberOfItems: number;
      subTotal: number;
      tax:number;
      total:number;
      shippingAdress?: ShippingAdress,
      addProductCart: (cartRef: ICart) => void;
      updateQuantityPRoduct: (cartProduct: any) => void;
      onRemoveProductInCart: (cartProduct: ICart) => void;
      updateAddress: (address: ShippingAdress) => void;
}
export const CartContext = createContext({} as ContextProps)