import './App.css';
import LogIn from './LogIn';
import SignUp from './SignUp';
import HomePage from './HomePage/HomePage';
import UsersList from './users';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

function App() {
  const [loginFlag, setLoginFlag] = useState(false)
  const flagChange = () => {
    // console.log("now we log in")
    // console.log(loginFlag);
    setLoginFlag(true)
    // console.log(loginFlag);
  }

  var users = UsersList();

  return (
  <Router>
    <Switch>
      <Route exact path="/"> 
        {!loginFlag ? <LogIn onFlagChange = {flagChange} users={users} /> : <Redirect to="/homepage"/>}
      </Route>
      <Route path="/signup" >
        <SignUp users={users} />
        {/* <SignUp users={users} onUsersChange={setUsers}/> */}
      </Route>
      <Route path="/homepage" >
        {loginFlag ? <HomePage /> : <Redirect to="/"/>}
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
