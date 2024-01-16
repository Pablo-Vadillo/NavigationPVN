import React, { useState } from 'react'
import {userContext,userContextType} from "../components/UserContext"
import { Register } from '../types/UserTypes'

type userContext = {
  children: JSX.Element | JSX.Element[]
}

const UserProvider = (props:userContext) => {
    const { children } = props;


    const [isLogged,setLogged] = useState (false)
    const [user,setUser] = useState<Register>({
        name:'',
        email:'',
        password:''
    });

    const toggleLogin = () =>{
        setLogged(!isLogged)
    }

    const userFunc = (userName:Register) =>{
        setUser({
        name:userName.name,
        email:userName.email,
        password:userName.password
        })
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