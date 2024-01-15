import React, { ContextType } from 'react'
import { Register } from '../types/UserTypes'

type userContextType = {
    user: Register;
    userFunc: (userData: Register) => void;
    isLogged: boolean;
    toggleLogin: () => void;
  };
  
  const userContext = React.createContext({} as userContextType);
  
  export { userContext, userContextType };
  