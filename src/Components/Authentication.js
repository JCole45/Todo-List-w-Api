import React, {useState, useEffect, useContext} from 'react'
import Login from "./Login"
import { Button } from 'antd';
import Register from "./Register"
import {UserContext} from "../Context/user/user-context"

const Authentication = () => {

    const [stage, setStage] = useState("login")

    const {userRegisterDetails} = useContext(UserContext)

    useEffect(() => {
        if(userRegisterDetails.success){
            setTimeout(() => {
                setStage("login")
            }, 2000)
        }
    }, [userRegisterDetails])

    const toggleStage = () => {
        if(stage === "login"){
            setStage("register")
        }else {
            setStage("login")
        }
    }

    const buttonText = () => {
        if(stage === "login") return "Register?"
        if(stage === "register") return "Login?"
    }

    const button = <Button type="text" onClick={toggleStage}> {buttonText()} </Button>
    return (
        <>
          {stage === "login" && <Login button={button} />}  
          {stage === "register" && <Register button={button}/>}
        </>
    )
}

export default Authentication