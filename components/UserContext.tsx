import React, { ContextType } from 'react'
type userContextType = {
    user:string
    userFunc: Function
    isLogged:Boolean
    toggleLogin:Function
}

const userContext = React.createContext({} as userContextType)

export {userContext,userContextType}