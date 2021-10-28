import React, {useState, useEffect} from 'react'
import Login from "./Login"
import { Button } from 'antd';
import Register from "./Register"
import { useSelector } from 'react-redux'

const Authentication = () => {

    const [stage, setStage] = useState("login")


    const userRegisterData = useSelector(state => state.userRegister)
    const { success: registerSuccess} = userRegisterData

    useEffect(() => {
        if(registerSuccess){
            setTimeout(() => {
                setStage("login")
            }, 2000)
        }
    }, [registerSuccess])

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
