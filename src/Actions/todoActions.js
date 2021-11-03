import axios from 'axios'
import {CREATE_TODO_SUCCESS, CREATE_TODO_REQUEST, CREATE_TODO_FAIL, FETCH_TODO_REQUEST, FETCH_TODO_SUCCESS, FETCH_TODO_FAIL, DELETE_TODO_SUCCESS, DELETE_TODO_FAIL, UPLOAD_TODO_SUCCESS, UPLOAD_TODO_FAIL, UPLOAD_TODO_REQUEST, EDIT_TODO_REQUEST, EDIT_TODO_SUCCESS, EDIT_TODO_FAIL, GET_TODO_FAIL, GET_TODO_REQUEST, GET_TODO_SUCCESS} from "../Constants/todoConstants"
import {api} from "../api/base"


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

        const {data} = await axios.get(`${api}/api/todo?page=${details.page}&pageSize=${details.pageSize}` , config)
        let result = data.result

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

export const fetchTodo = (id) => async(dispatch, getState) => {
    const {userLogin: {user}} = getState()

    const headerValue = user.token
    const userId = user._id

    const authorization = Buffer.from(userId + ' ' + headerValue).toString("base64")

    dispatch({
        type: GET_TODO_REQUEST
    })

    try{
        const config = {
            headers: {
                Authorization: `Bearer ${authorization}`
            },
        }

        const {data} = await axios.get(`${api}/api/todo/${id}` , config)
        let result = data.result
        let message = data.message

        dispatch({
            type: GET_TODO_SUCCESS,
            payload: {...result, message}
        })
    }catch(err){
        dispatch({
            type: GET_TODO_FAIL,
            payload: err.message
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
                Authorization: `Bearer ${authorization}`,
            },
        }

        const body = {
            name: todo
        }
        const {data} = await axios.post(`${api}/api/todo`, body , config)

        let message = data.message
        let result = data.result

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

        const {message} = await axios.post(`${api}/api/todo/upload`, file , config)

        dispatch({
            type: UPLOAD_TODO_SUCCESS,
            payload: message
        })

        dispatch(fetchTodos({page:1, pageSize:25}))


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

        const {data} = await axios.put(`${api}/api/todo/${details._id}`, body , config)
        let result = data.result
        let message = data.message

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

    try{
        const config = {
            headers: {
                Authorization: `Bearer ${authorization}`
            },
        }

        const {data} = await axios.delete(`${api}/api/todo/${_id}`, config)
        const message = data.message

        dispatch({
            type: DELETE_TODO_SUCCESS,
            payload: _id
        })
    }catch(err){
        dispatch({
            type: DELETE_TODO_FAIL,
            payload: err.message
        })
    }
}

