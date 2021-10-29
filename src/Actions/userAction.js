import axios from 'axios'
import {USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_FAIL, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, SIGN_OUT_USER} from "../Constants/userConstants"
import {api} from "../api/base"


export const loginUser = (loginDetails) => async (dispatch) => {
    dispatch({
        type: USER_LOGIN_REQUEST
    })

    try{
        const config = {
            'Content-Type': 'application/json',
        }

        const body = {
            email: loginDetails.username,
            password: loginDetails.password
        }

        const {result, message} = await axios.post(`${api}/api/login/`, body , config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: {message, ...result}
        })

    }
    catch(err){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: err.message
        })
    }
}



export const registerUser = (registerDetails) => async (dispatch) => {
    dispatch({
        type: USER_REGISTER_REQUEST
    })

    try{
        const config = {
            'Content-Type': 'application/json',
        }

        const body = {
            name: registerDetails.name,
            email: registerDetails.username,
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
}