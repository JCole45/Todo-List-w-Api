import React, {useContext} from 'react'
import { Pagination } from 'antd';
import {TodoContext} from "../Context/todo/todo-context"
import {UserContext} from "../Context/user/user-context"
import axios from "axios"
import {api} from "../api/base"

const Paginate = () => {

    const {todoState, updateTodoState} = useContext(TodoContext)
    const {signOut, userDetails, checkUser} = useContext(UserContext)

    const handleFectch = async ({page, pageSize}) => {
        const {user} = userDetails
    
        const headerValue = user?.token
        const userId = user?._id
    
        const authorization = Buffer.from(userId + ' ' + headerValue).toString("base64")
    
        try{
            const config = {
                headers: {
                    Authorization: `Bearer ${authorization}`
                },
            }
    
            const {data} = await axios.get(`${api}/api/todo?page=${page}&pageSize=${pageSize}` , config)
            let result = data.result
    
            updateTodoState({
              total: result.total,
              todos: result.todos,
              message: null,
            })
        } catch(err){
            updateTodoState({
              total: todoState.total,
              todos: todoState.todos,
              message: { message: err.message, type: "error" },
            })
        }
    }

    const handleChange = (e) => {
        handleFectch({page:e, pageSize:10})
    }

    return (
        <div style={{width:"100%", display:"flex", justifyContent:"flex-end"}}>
            <Pagination onChange={handleChange} defaultCurrent={1} pageSize={10} total={todoState.total}/>
        </div>
    )
}

export default Paginate
