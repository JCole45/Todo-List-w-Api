import React, {useEffect} from "react"
import './App.css';
import Todo from "./Components/Todo"
import Authentcation from "./Components/Authentication"
import { useDispatch, useSelector } from 'react-redux'
import {fetchTodos} from "./Actions/todoActions"


function App() {
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos({page:1, pageSize:25}))
  }, [])

  const userData = useSelector(state=> state.userLogin)
  const { user } = userData

  return (
    <div className="App">
      {!user?.token && <Todo/>}
      {user?.token && <Authentcation/>}
    </div>
  );
}

export default App;
