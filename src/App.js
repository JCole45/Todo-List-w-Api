import React, {useEffect, useContext} from "react"
import './App.css';
import Todo from "./Components/Todo"
import Authentcation from "./Components/Authentication"
import {UserContext} from "./Context/user/user-context"
import {TodoContext} from "./Context/todo/todo-context"
import axios from "axios"
import {api} from "./api/base"

function App() {
  
  const {userDetails, getUserDetails} = useContext(UserContext)
  const {todoState, updateTodoState} = useContext(TodoContext)


  useEffect(() => {
    getUserDetails()
  }, [])

  useEffect( async () => {
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

        const {data} = await axios.get(`${api}/api/todo?page=${1}&pageSize=${10}` , config)
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
  }, [userDetails])

  return (
    <div className="App">
      {userDetails?.user?.token && <Todo/>}
      {!userDetails?.user?.token && <Authentcation/>}
    </div>
  );
}

export default App;
