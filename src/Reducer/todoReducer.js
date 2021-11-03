import {CREATE_TODO_REQUEST, CREATE_TODO_SUCCESS, CREATE_TODO_FAIL, FETCH_TODO_SUCCESS, DELETE_TODO_SUCCESS, DELETE_TODO_FAIL, GET_TODO_FAIL, GET_TODO_REQUEST, GET_TODO_SUCCESS, GET_TODO_RESET} from "../Constants/todoConstants"

export const todoReducer = (state={todos:[], loading:false, success:false}, action) => {
    switch(action.type){
        case FETCH_TODO_SUCCESS: 
            return {todos: action.payload, loading: false, success: false}
        case CREATE_TODO_REQUEST: 
            return {loading: true, success: false, todos: state.todos}
        case CREATE_TODO_SUCCESS: 
            return {loading: false, success: true, todos:[action.payload, ...state.todos]}
        case CREATE_TODO_FAIL: 
            return {laoding: false, success: false, todos: state.todos, error: action.payload}
        case DELETE_TODO_SUCCESS:
            return state = {loading: false, success: false, todos: state.todos.filter(item => item._id !== action.payload)}
        case DELETE_TODO_FAIL:
            return {...state, error: action.payload}
        default:
            return state
            
    } 
}

export const getTodoReducer = (state={todo:{}, loading: false, success: false}, action) => {
    switch(action.type){
        case GET_TODO_REQUEST:
            return {todo: state.todo, loading: true, success: false}
        case GET_TODO_SUCCESS:
            return {todo: action.payload, loading: false, success: true}
        case GET_TODO_FAIL:
            return {todo: {}, loading: false, success: false, error: action.payload }
        case GET_TODO_RESET:
            return {todo:{}, loading: false, success: false}
        default:
            return state
    }
}

