import React, {useEffect} from "react"
import './App.css';
import Todo from "./Components/Todo"
import Authentcation from "./Components/Authentication"
import { useDispatch, useSelector } from 'react-redux'
import {fetchTodos} from "./Actions/todoActions"

function App() {
  
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const {success} = userLogin

  useEffect(() => {
    dispatch(fetchTodos({page:1, pageSize:30}))
  }, [success])

  const userData = useSelector(state=> state.userLogin)
  const { user } = userData

  return (
    <div className="App">
      {user?.token && <Todo/>}
      {!user?.token && <Authentcation/>}
    </div>
  );
}

export default App;
