
import { ICart } from '@/interfaces';
import { CartState } from '.';

type CartActionType = 
        | { type: '[Cart] - LoadCart from cookies | storage', payload: ICart[]}
        | { type: '[Cart] - Update Product in cart', payload: ICart[]}
        | { type: '[Cart] - Update quantity of product in cart', payload: ICart}
        | { type: '[Cart] - Remove  product in cart', payload: ICart}
        | { type: '[Cart] - Update order Sumary in cart', payload: {
                numberOfItems: number;
                subTotal: number;
                tax:number;
                total:number;
        }}

export const CartReducer =(state: CartState, action: CartActionType ):CartState => {
    switch (action.type) {
        case '[Cart] - LoadCart from cookies | storage':
            return {
                ...state,
                cart: [...action.payload]
            }
        case '[Cart] - Update Product in cart':
                return {
                    ...state,
                    cart: [...action.payload]
                }    
        case '[Cart] - Update quantity of product in cart':
                return {
                    ...state,
                    cart: state.cart.map( pro =>{
                        if ( pro._id !== action.payload._id) return pro;
                        if ( pro.size !== action.payload.size) return pro;

                        //pro.quantity = action.payload.quantity
                        //return pro
                        return action.payload


                    })
                    
                }    
        case '[Cart] - Remove  product in cart':
                    return {
                        ...state,
                        cart: state.cart.filter( pro => !(pro._id === action.payload._id && pro.size === action.payload.size)
                      
                        )
                    }
        case '[Cart] - Update order Sumary in cart':
                    return {
                        ...state,
                        ...action.payload
                    }
        default:
            return state;
    }

}