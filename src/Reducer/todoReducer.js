import {CREATE_TODO_REQUEST, CREATE_TODO_SUCCESS, CREATE_TODO_FAIL, FETCH_TODO_SUCCESS, DELETE_TODO_SUCCESS, DELETE_TODO_FAIL, UPLOAD_TODO_SUCCESS, GET_TODO_FAIL, GET_TODO_REQUEST, GET_TODO_SUCCESS, GET_TODO_RESET, CLEAR_MESSAGE, CREATE_MESSAGE, DOWNLOAD_TODO_REQUEST, DOWNLOAD_TODO_FAIL, DOWNLOAD_TODO_RESET, DOWNLOAD_TODO_SUCCESS} from "../Constants/todoConstants"

export const todoReducer = (state={todos:[], loading:false, success:false, message:null}, action) => {
    switch(action.type){
        case FETCH_TODO_SUCCESS: 
            return {todos: action.payload, loading: false, success: false}
        case CREATE_TODO_REQUEST: 
            return {loading: true, success: false, todos: state.todos}
        case CREATE_TODO_SUCCESS: 
            return {loading: false, success: true, todos:[action.payload, ...state.todos], message:{message: "created", type: "success"}}
        case CREATE_TODO_FAIL: 
            return {laoding: false, success: false, todos: state.todos, error: action.payload, message: {message: action.payload, type: "error"}}
        case DELETE_TODO_SUCCESS:
            return state = {loading: false, success: false, todos: state.todos.filter(item => item._id !== action.payload), message: {message: "Todo item deleted", type: "success"}}
        case DELETE_TODO_FAIL:
            return {...state, error: action.payload, message: {message: action.payload, type: "error"}}
        case UPLOAD_TODO_SUCCESS:
            return {...state, message: {message: "File upload successful", type: "success"}}
        case CREATE_MESSAGE:
            return {...state, message: action.payload}
        case CLEAR_MESSAGE:
            return {...state, message:null}
        default:
            return state
    } 
}

export const downloadTodoReducer = (state={file:null, loading: false, success: false}, action) => {
    switch(action.type){
        case DOWNLOAD_TODO_REQUEST:
            return {file:[], loading: true, success: false}
        case DOWNLOAD_TODO_SUCCESS:
            return {file: action.payload, loading: false, success: true}
        case DOWNLOAD_TODO_FAIL:
            return {loading: false, file: null, success: false, error: action.payload}
        case DOWNLOAD_TODO_RESET:
            return {file: null, loading: false, success: false}
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
        case CLEAR_MESSAGE:
            return {todo: state.todo, loading: false, success: false}
    }
}

