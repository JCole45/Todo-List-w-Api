import axios from 'axios'
import {CREATE_TODO_SUCCESS, CREATE_TODO_REQUEST, CREATE_TODO_FAIL} from "../Constants/todoConstants"


export const createTodoItem = (todo) => (dispatch, getState) => {
    const {userLogin: {user}} = getState()

    const headerValue = user.result.token
    const userId = user.result.id

    dispatch({
        type: CREATE_TODO_REQUEST
    })

    try{
        const config = {
            headers: {
                Authorization: `Bearer ${userId} ${headerValue}`
            },
            body: {
                name: todo.name,
                content: todo.content
            }
        }

        const {data} = await axios.post(`/api/todo/`, {} , config)

        dispatch({
            type: CREATE_TODO_SUCCESS,
            payload: data
        })

    }
    catch(err){
        dispatch({
            type: CREATE_TODO_FAIL,
            payload: err.message
        })
    }
}

