import axios from 'axios'

import {USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_FAIL, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST} from "../Constants/userConstants"


export const loginUser = (loginDetails) => async (dispatch) => {
    dispatch({
        type: USER_LOGIN_REQUEST
    })

    try{
        const config = {
            body: {
                email: loginDetails.username,
                password: loginDetails.password
            }
        }

        const {data} = await axios.post(`/api/login/`, {} , config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
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
            body: {
                name: registerDetails.name
                email: registerDetails.username,
                password: registerDetails.password
                confirmPassword: registerDetails.confirm_password
            }
        }

        const {data} = await axios.post(`/api/signup`, {} , config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

    }
    catch(err){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: err.message
        })
    }
}