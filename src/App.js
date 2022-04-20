import './App.css';
import LogIn from './LogIn/LogIn';
import SignUp from './SignUp/SignUp';
import HomePage from './HomePage/HomePage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useState } from 'react';
import { Redirect } from 'react-router-dom';



function App() {
  const [users, setUsers] = useState([
    { userName: "NivGor", displayName: "NivGor", password: "123456"},
    { userName: "OrAlmog", displayName: "Or", password:"password"},
    { userName: "Tony Stark", displayName: "Iron man", password:"iamironman"}
    ]);
  const [loginFlag, setLoginFlag] = useState(false)
  const flagChange = () => {
    // console.log("now we log in")
    // console.log(loginFlag);
    setLoginFlag(true)
    // console.log(loginFlag);
  }

  return (
  <Router>
    <Switch>
      <Route exact path="/"> 
        {!loginFlag ? <LogIn onFlagChange = {flagChange} users={users} /> : <Redirect to="/homepage"/>}
      </Route>
      <Route path="/signup" >
        <SignUp users={users} onUsersChange={setUsers}/>
      </Route>
      <Route path="/homepage" >
        {loginFlag ? <HomePage /> : <Redirect to="/"/>}
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
