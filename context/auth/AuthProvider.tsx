
import { FC, useReducer, useEffect } from 'react';
import { AuthContext, AuthReducer } from './';
import { IUser } from '@/interfaces/IUser';
import { tesloapi } from '@/apis';
import  Cookies from 'js-cookie'
import axios from 'axios';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';


// props
interface Props {
  children: string | JSX.Element | JSX.Element[];
}

// interface
   export interface AuthState {
    isLoggedIn:boolean ;
    user?: IUser;
    }
  // initial state  
  export const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn:false,
    user: undefined
   }

   /************************* */
   /* componenete principal */
  export const AuthProvider:FC<Props> = ({children}) => {

  const router = useRouter()

  const { data, status } = useSession()
  
  const [state, dispatch] = useReducer(AuthReducer, AUTH_INITIAL_STATE);

  
 useEffect(() => {
   if (status === 'authenticated') {
    //console.log('data', data)
    dispatch({type: '[Auth] - Login', payload:data?.user as IUser})
   }
 }, [status, data]);

  // useEffect(() => {
  //   checkToken()
  // }, []);

  const checkToken = async() => {
    // verificar token
    if (!Cookies.get('token')) {
        return
    }

   try {
    const { data } = await tesloapi.get('/user/validate-token')
   const { token, user} = data 

    Cookies.set('token', token)
    dispatch({type:'[Auth] - Login', payload: user})

   } catch (error) {
     Cookies.remove('token')
   }
  }


  const loginUser = async (email:string, password:string): Promise<boolean> => {
    try {
      const { data } = await tesloapi.post('/user/login', {email,password})
     
      const { token, user} = data 

      Cookies.set('token', token)
      dispatch({type:'[Auth] - Login', payload: user})

      return true
      
    } catch (error) {
      console.log('error')
    }
  }

  const registerUser = async (name:string, email:string, password:string)
      : Promise<{hasError: boolean; message?:string}> => {
        try {
          const { data } = await tesloapi.post('/user/register', {name,email,password})
          const { token, user} = data 
          Cookies.set('token', token)
          dispatch({type:'[Auth] - Login', payload: user})

           return {
            hasError: false,
            
          }
        } catch (error) {
           if (axios.isAxiosError(error)) {
            return {
              hasError:true, 
              message : error.response?.data
            }
           }
           return {
            hasError: true,
            message: 'exist a problen with create user'
           }
        }
  }


  
  const logout = () => {
    Cookies.remove('cart')
    
    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('address');
    Cookies.remove('address2');
    Cookies.remove('zip');
    Cookies.remove('city');
    Cookies.remove('country');
    Cookies.remove('phone');
    signOut()
    //router.reload()
    //Cookies.remove('token')
  }
  return (
             <AuthContext.Provider value={{ 
                ...state,
                // methods
                loginUser,
                registerUser,
                logout
                }}>
              {children}
         </AuthContext.Provider>
        )
   }