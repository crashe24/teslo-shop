import { FC, useReducer } from 'react';
import { UiContext, UiReducer } from './';

interface Props {
     children: string | JSX.Element | JSX.Element[];
}
   export interface UiState {
  isMenuOpen:boolean
  }
  export const UI_INITIAL_STATE: UiState = {
  isMenuOpen:false
   }
  export const UiProvider:FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(UiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => {
     dispatch({type: '[Ui] - ToddleMenu'})
  }
         return (
             <UiContext.Provider value={{ 
               ...state,
               // methods
               toggleSideMenu,
               }}>
              {children}
         </UiContext.Provider>
        )
   }