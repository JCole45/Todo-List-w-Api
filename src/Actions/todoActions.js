import axios from 'axios'
import {CREATE_TODO_SUCCESS, CREATE_TODO_REQUEST, CREATE_TODO_FAIL, FETCH_TODO_REQUEST, FETCH_TODO_SUCCESS, FETCH_TODO_FAIL, DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS, DELETE_TODO_FAIL, UPLOAD_TODO_SUCCESS, UPLOAD_TODO_FAIL, UPLOAD_TODO_REQUEST, EDIT_TODO_REQUEST, EDIT_TODO_SUCCESS, EDIT_TODO_FAIL} from "../Constants/todoConstants"



export const fetchTodos = (details) => async (dispatch, getState) => {
    const {userLogin: {user}} = getState()

    const headerValue = user.token
    const userId = user._id

    const authorization = Buffer.from(userId + ' ' + headerValue).toString("base64")
    dispatch({
        type: FETCH_TODO_REQUEST
    })

    try{
        const config = {
            headers: {
                Authorization: `Bearer ${authorization}`
            },
        }

        const {result} = await axios.get(`https://superpoweredtodo.herokuapp.com/api/todo?page=${details.page}&pageSize=${details.pageSize}`, {} , config)

        dispatch({
            type: FETCH_TODO_SUCCESS,
            payload: result.todos
        })
    }catch(err){
        dispatch({
            type: FETCH_TODO_FAIL,
            err: err.message
        })
    }
}

export const createTodoItem = (todo) => async (dispatch, getState) => {
    const {userLogin: {user}} = getState()

    const headerValue = user.token
    const userId = user._id

    const authorization = Buffer.from(userId + ' ' + headerValue).toString("base64")

    dispatch({
        type: CREATE_TODO_REQUEST
    })

    try{
        const config = {
            headers: {
                Authorization: `Bearer ${authorization}`
            },
        }

        const body = {
            name: todo
        }
        const {result, message} = await axios.post(`https://superpoweredtodo.herokuapp.com/api/todo`, body , config)

        dispatch({
            type: CREATE_TODO_SUCCESS,
            payload: {...result, message}
        })

    }
    catch(err){
        dispatch({
            type: CREATE_TODO_FAIL,
            payload: err.message
        })
    }
}

export const uploadTodoItem = (file) => async (dispatch, getState) =>{
    const {userLogin: {user}} = getState()

    const headerValue = user.token
    const userId = user._id

    const authorization = Buffer.from(userId + ' ' + headerValue).toString("base64")

    dispatch({
        type: UPLOAD_TODO_REQUEST
    })

    try{
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${authorization}`
            },
        }

        const {message} = await axios.post(`https://superpoweredtodo.herokuapp.com/api/todo/upload`, file , config)

        dispatch({
            type: UPLOAD_TODO_SUCCESS,
            payload: message
        })


    }catch(err){
        dispatch({
            type: UPLOAD_TODO_FAIL,
            err: err.message
        })
    }
}


export const editTodoItem = (text, details) => async (dispatch, getState) => {
    const {userLogin: {user}} = getState()

    const headerValue = user.token
    const userId = user._id

    const authorization = Buffer.from(userId + ' ' + headerValue).toString("base64")

    dispatch({
        type: EDIT_TODO_REQUEST
    })

    try{
        const config = {
            headers: {
                Authorization: `Bearer ${authorization}`
            },
        }

        const body = {
            name: text,
            content: "",
            status: details.status
        }

        const {result, message} = await axios.put(`https://superpoweredtodo.herokuapp.com/api/todo/${details._id}`, body , config)

        dispatch({
            type: EDIT_TODO_SUCCESS,
            payload: {...result, message}
        })

        dispatch(fetchTodos({page:1, pageSize:25}))

    }
    catch(err){
        dispatch({
            type: EDIT_TODO_FAIL,
            payload: err.message
        })
    }
}

export const deleteTodoItem = (_id) => async (dispatch, getState) => {
    const {userLogin: {user}} = getState()

    const headerValue = user.token
    const userId = user._id

    const authorization = Buffer.from(userId + ' ' + headerValue).toString("base64")

    dispatch({
        type: DELETE_TODO_REQUEST
    })

    try{
        const config = {
            headers: {
                Authorization: `Bearer ${authorization}`
            },
        }

        const {message} = await axios.delete(`https://superpoweredtodo.herokuapp.com/api/todo/${_id}`, {} , config)

        dispatch({
            type: DELETE_TODO_SUCCESS,
            paylaod: {_id}
        })
    }catch(err){
        dispatch({
            type: DELETE_TODO_FAIL,
            payload: err.message
        })
    }
}

