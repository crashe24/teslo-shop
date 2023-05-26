
import { FC, useEffect, useReducer, useRef } from 'react';
import { CartContext, CartReducer } from './';
import { ICart, IOrder, ShippingAdress } from '@/interfaces';
import Cookie from 'js-cookie'
import { tesloapi } from '@/apis';
import axios from 'axios';



interface Props {
     children: string | JSX.Element | JSX.Element[];
}

export interface CartState {
         isLoaded:boolean;
          cart:ICart[];
          numerOfItems: number;
          subTotal: number;
          tax:number;
          total:number;
          shippingAdress?: ShippingAdress;
  }




  export const CART_INITIAL_STATE: CartState = {
   isLoaded: false,
  cart:[],
  numerOfItems: 0,
  subTotal: 0,
  tax:0,
  total:0,
  shippingAdress: undefined
   }


  export const CartProvider:FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(CartReducer, CART_INITIAL_STATE);
  
   const ref = useRef(true);
  useEffect(() => {
  
     try {

        const cookie = Cookie.get('cart') ?  JSON.parse( Cookie.get('cart')!) : []
         dispatch({type:'[Cart] - LoadCart from cookies | storage', payload: cookie})
          
          
     } catch (error) {
          dispatch({type:'[Cart] - LoadCart from cookies | storage', payload: []})
     }

  }, []);

  useEffect(() => {
     if (ref) {
          ref.current = false
          if (state.cart.length === 0) return 
     } 
     Cookie.set('cart', JSON.stringify(state.cart))
  
  }, [state.cart]);


  useEffect(() => {

     const taxesRef = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)
     const ordenSumary = {
          numberOfItems: state.cart.reduce((prev, current)=> current.quantity + prev,0 ),
          subTotal: state.cart.reduce((prev, current) => (current.price * current.quantity) + prev, 0),
          tax: state.cart.reduce((prev, current) => (current.price * current.quantity) + prev, 0) * taxesRef,
          total: state.cart.reduce((prev, current) => (current.price * current.quantity) + prev, 0) * (taxesRef + 1)
     }

     dispatch({type:'[Cart] - Update order Sumary in cart', payload:ordenSumary})
  }, [state.cart]);


useEffect(() => {

   if (Cookie.get('firstName') !== undefined) {
         const shipAddress = {
            firstName: Cookie.get('firstName') || '',
            lastName : Cookie.get('lastName')|| '',
            address  : Cookie.get('address')|| '',
            address2 : Cookie.get('address2')|| '',
            zip      : Cookie.get('zip')|| '',
            city     : Cookie.get('city')|| '',
            country  : Cookie.get('country')|| '',
            phone    : Cookie.get('phone')|| ''
         }
      dispatch({type:'[Cart] - Loaded  from Cookie shippingAddress',payload: shipAddress})
   }
}, []);

  const addProductCart = (cartRef: ICart) => {
     const existProductById = state.cart.some( p => p._id === cartRef._id);

     //aqui verifica que no existe en el carrito
     if (!existProductById) return dispatch({ type:'[Cart] - Update Product in cart', payload: [...state.cart, cartRef]}) 

     // aqui verifica que existe con el id y la talla 
     const existProductBySize = state.cart.some(p => p._id === cartRef._id && p.size === cartRef.size);
     if ( !existProductBySize ) return dispatch({ type:'[Cart] - Update Product in cart', payload: [...state.cart, cartRef]}) 

     // aqui existe con el id y la talla se acumula
     const updatedProduct = state.cart.map ( p => {
          if (p._id !== cartRef._id) return p
          if (p.size !== cartRef._id) return p

          // actualizar la cantidad
          p.quantity += cartRef.quantity
          return p
     })

     // enviamos el producto 
     dispatch({type:'[Cart] - Update Product in cart',payload:[...updatedProduct]})
  }

  const updateQuantityPRoduct = (cartProduct: ICart) => {
     dispatch({type: '[Cart] - Update quantity of product in cart', payload: cartProduct})

  }

  const onRemoveProductInCart = (cartProduct: ICart) => {
     dispatch({type: '[Cart] - Remove  product in cart', payload: cartProduct})
  }


  const updateAddress =(  address: ShippingAdress)  => {

         Cookie.set('firstName',address.firstName);
         Cookie.set('lastName',address.lastName);
         Cookie.set('address',address.address);
         Cookie.set('address2',address.address2 || '');
         Cookie.set('zip',address.zip);
         Cookie.set('city',address.city);
         Cookie.set('country',address.country);
         Cookie.set('phone',address.phone);
         
      dispatch({type:'[Cart] - Update shippingAddress', payload:address})
  }

  const createOrder = async(): Promise<{hasError: boolean; message: string;}> => {

      if (!state.shippingAdress ) {
         throw new Error('Not exist address shipping')
      }

      const body: IOrder = {
         orderItems      : state.cart.map( p => ({
            ...p,
            size: p.size!
         })),
         shippingAddress : state.shippingAdress,
         numberOfItems   : state.numerOfItems,
         subTotal        : state.subTotal,
         tax             : state.tax,
         total           : state.total,
         isPaid          : false
      }

      try {
         const { data } = await tesloapi.post<IOrder>('/orders', body)
         //console.log('data', data)
         dispatch({type:'[Cart] - Order complete'})
         return {
            hasError: false, 
            message: data._id!
         }
      } catch (error) {
         if (axios.isAxiosError(error)) {
            return {
               hasError: true,
               message: error.response?.data.message
            }
         }
         return {
            hasError: true,
            message: 'Error indefined, Speaks with administrator'
         }
      }
  }
         return (
             <CartContext.Provider value={{ ...state,
               // methods
               addProductCart,
               updateQuantityPRoduct,
               onRemoveProductInCart,
               updateAddress,
               createOrder
             }}>
              {children}
         </CartContext.Provider>
        )
   }