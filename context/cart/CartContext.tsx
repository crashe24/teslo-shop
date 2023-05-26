
import { ICart, ShippingAdress } from '@/interfaces';
import { createContext } from 'react';

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
      createOrder: () => Promise<{hasError: boolean; message: string;}>;
}
export const CartContext = createContext({} as ContextProps)