import React, { useState } from "react"
import { UserContext } from "./user-context"

export const UserProvider = ({children}) => {
    const registerInitailValue = {user: {}, success: false}
    const loginInitialValue = {user: {}}

    const [userDetails, setUserDetails] = useState(loginInitialValue)
    const [userRegisterDetails, setUserRegisterDetails] = useState(registerInitailValue)

    const getUserDetails = () => {
        const userFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
        if(userFromStorage)setUserDetails(userFromStorage)
        console.log(userDetails)
    }

    const updateUserDetails = (values) => {
        console.log(values)
        setUserDetails({user: values})
        console.log(userDetails)
    }

    const registerUser = (values) => {
        setUserRegisterDetails({user:values, success: true})
    }

    const signOut = () => {
        localStorage.setItem('userInfo', null)
        setUserDetails(null)
        setUserRegisterDetails(registerInitailValue)
    }

    const checkUser = () => {
        console.log(userDetails)
    }

    return(
        <UserContext.Provider value={{ userDetails, userRegisterDetails, getUserDetails, updateUserDetails, signOut, registerUser, checkUser }}>
            {children}
        </UserContext.Provider>
    )
}