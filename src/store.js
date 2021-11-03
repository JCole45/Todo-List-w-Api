import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {userLoginReducer, userRegisterReducer} from "./Reducer/userReducer"
import {todoReducer} from "./Reducer/todoReducer"

const reducer = combineReducers({
    todo: todoReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
})

const tokenFromStorage = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : ""

const initialState = {
}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store