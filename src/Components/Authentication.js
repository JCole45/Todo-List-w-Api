import React, {useState, useEffect} from 'react'
import Login from "./Login"
import Register from "./Register"
import { useDispatch, useSelector } from 'react-redux'

const Authentication = () => {

    const [stage, setStage] = useState("login")

    const userLoginData = useSelector(state=> state.userLogin)
    const { user, success, loading, error} = userLoginData

    const userRegisterData = useSelector(state => state.userRegister)
    const {user: registerUser, success: registerSuccess, loading: registerLoading, error: registerError} = userRegisterData

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
        if(stage === "login") return "Register"
        if(stage === "register") return "Login"
    }

    const button = <button onClick={toggleStage}> {buttonText()} </button>
    return (
        <>
          {stage === "login" && <Login button={button} />}  
          {stage === "register" && <Register button={button}/>}
        </>
    )
}

export default Authentication
