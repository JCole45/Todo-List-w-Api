import {CREATE_TODO_REQUEST, CREATE_TODO_SUCCESS, CREATE_TODO_FAIL} from "../Constants/todoConstants"

export const todoReducer = (state={todos:[], loading:false, success:false}, action) => {
    switch(action.type){
        case CREATE_TODO_REQUEST: 
            return {loading: true, success: false, todos: state.todos}
        case CREATE_TODO_SUCCESS: 
            return {loading: false, success: true, todos:[...state.todos, action.payload]}
        case CREATE_TODO_FAIL: 
            return {laoding: false, success: false, todos: state.todos, error: action.payload}
        default:
            return state
    } 
}