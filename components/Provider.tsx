import React, { useState } from 'react'
import {userContext,userContextType} from "../components/UserContext"

type userContext = {
  children: JSX.Element | JSX.Element[]
}

const UserProvider = (props:userContext) => {
    const { children } = props;


    const [isLogged,setLogged] = useState (false)
    const [user,setUser] = useState("")

    const toggleLogin = () =>{
        setLogged(true)
    }

    const userFunc = (userName:string) =>{
        setUser(userName)
    }

    const defaultValue: userContextType = {
        user,
        userFunc,
        isLogged,
        toggleLogin
    }

    return (
        <userContext.Provider value={defaultValue}>
          {children}
        </userContext.Provider>
    )
    
}
export default UserProvider