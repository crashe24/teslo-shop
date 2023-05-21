
import { IUser } from '@/interfaces/IUser';
import { createContext } from 'react';
export interface ContextProps {
      isLoggedIn: boolean;
      user?: IUser;
      loginUser: (email: string, password: string) => Promise<boolean>;
      registerUser: (name: string, email: string, password: string) => Promise<{
            hasError: boolean;
            message?: string;
      }>;
      logout: () => void;

}
export const AuthContext = createContext({} as ContextProps)