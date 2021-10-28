import {CREATE_TODO_REQUEST, CREATE_TODO_SUCCESS, CREATE_TODO_FAIL,FETCH_TODO_REQUEST, FETCH_TODO_SUCCESS, DELETE_TODO_SUCCESS} from "../Constants/todoConstants"

export const todoReducer = (state={todos:[{_id:'1', name:"John", status:"Active", content:"Todo item"}], loading:false, success:false}, action) => {
    switch(action.type){
        case FETCH_TODO_SUCCESS: 
            return {todos: action.payload, loading: false, success: false}
        case CREATE_TODO_REQUEST: 
            return {loading: true, success: false, todos: state.todos}
        case CREATE_TODO_SUCCESS: 
            return {loading: false, success: true, todos:[...state.todos, action.payload]}
        case CREATE_TODO_FAIL: 
            return {laoding: false, success: false, todos: state.todos, error: action.payload}

        case DELETE_TODO_SUCCESS:
            return {loading: false, success: false, todos: state.todos.filter(item => item._id !== action.payload)}
        default:
            return state
    } 
}