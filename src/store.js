import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {userLoginReducer, userRegisterReducer} from "./Reducer/userReducer"
import {todoReducer, getTodoReducer} from "./Reducer/todoReducer"

const reducer = combineReducers({
    todo: todoReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    getTodo: getTodoReducer
})

const userFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}

const initialState = {
    userLogin: {...userFromStorage}
}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store