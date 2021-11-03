import {USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_FAIL, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_RESET, USER_REGISTER_RESET, SIGN_OUT_USER} from "../Constants/userConstants"

export const userLoginReducer = (state={loading:false, success:false, user:{}}, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST: 
            return {loading: true, success: false, user: state.user}
        case USER_LOGIN_SUCCESS:
            return {loading: false, success: true, user:action.payload}
        case USER_LOGIN_FAIL: 
            return {loading: false, success: false, error: action.payload, user: state.user}
        case USER_LOGIN_RESET: 
            return {loading: false, success: false, user: state.user}
        case SIGN_OUT_USER:
            return {loading:false, success:false, user:{}}
        default:
            return state
    }
}

export const userRegisterReducer = (state = {loading:false, success: false, user:{} }, action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading: true, success: false}
        case USER_REGISTER_SUCCESS: 
            return {loading: false, success: true, user: action.payload}
        case USER_REGISTER_FAIL:
            return {loading: false, success:false, error: action.payload, user: state.user}
        case USER_REGISTER_RESET:
            return {loading: false, success:false, user: state.user}
        case SIGN_OUT_USER:
            return {loading:false, success:false, user:{}}
        default:
            return state
    }
}
