
import { ICart } from '@/interfaces';
import { createContext } from 'react';
export interface ContextProps {
      cart: ICart[];
      numberOfItems: number;
      subTotal: number;
      tax:number;
      total:number;
      addProductCart: (cartRef: ICart) => void;
      updateQuantityPRoduct: (cartProduct: any) => void;
      onRemoveProductInCart: (cartProduct: ICart) => void;
}
export const CartContext = createContext({} as ContextProps)