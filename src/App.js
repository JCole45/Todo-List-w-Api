import logo from './logo.svg';
import './App.css';
import Login from "./Components/Login"
import Register from "./Components/Register"
import Todo from "./Components/Todo"
import { useDispatch, useSelector } from 'react-redux'


function App() {
  const userData = useSelector(state=> state.userLogin)
  const {user} = userData
  return ( 
    <div className="App">
      {user.result.token && <Todo/>}
      {!user?.result?.token && <Login/>}
    </div>
  );
}

export default App;
