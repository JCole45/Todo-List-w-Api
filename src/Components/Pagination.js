import React from 'react'
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import {fetchTodos} from "../Actions/todoActions"

const Paginate = () => {
    const dispatch = useDispatch()

    const Todos = useSelector(state => state.todo)
    const {todos, message, total} = Todos

    const handleChange = (e) => {
        console.log(e)
        dispatch(fetchTodos({page:e, pageSize:10}))

    }

    return (
        <div style={{width:"100%", display:"flex", justifyContent:"flex-end"}}>
            <Pagination onChange={handleChange} defaultCurrent={1} pageSize={10} total={total}/>
        </div>
    )
}

export default Paginate
