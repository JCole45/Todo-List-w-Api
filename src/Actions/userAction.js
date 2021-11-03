import axios from 'axios'
import {USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_FAIL, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, SIGN_OUT_USER} from "../Constants/userConstants"
import {api} from "../api/base"


export const loginUser = (loginDetails) => async (dispatch, getState) => {
    const {userLogin} = getState()

    dispatch({
        type: USER_LOGIN_REQUEST
    })

    try{
        const config = {
            'Content-Type': 'application/json',
        }

        const body = {
            email: loginDetails.email,
            password: loginDetails.password
        }

        const {data} = await axios.post(`${api}/api/login/`, body , config)
        let message = data.message
        let result = data.result

        console.log("loging", data)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: {message, ...result}
        })

        localStorage.setItem('token', JSON.stringify(result.token))

    }
    catch(err){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: err.message
        })
    }
}



export const registerUser = (registerDetails) => async (dispatch) => {
    console.log(registerDetails)
    dispatch({
        type: USER_REGISTER_REQUEST
    })

    try{
        const config = {
            'Content-Type': 'application/json',
        }

        const body = {
            name: registerDetails.name,
            email: registerDetails.email,
            password: registerDetails.password,
            confirmPassword: registerDetails.confirm_password
        }


        const {result, message} = await axios.post(`${api}/api/signup`, body , config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: { message, ...result}
        })

    }
    catch(err){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: err.message
        })
    }
}

export const signOutUser = () => (dispatch) => {
  dispatch({
      type: SIGN_OUT_USER
  })

  localStorage.setItem('token', null)
}