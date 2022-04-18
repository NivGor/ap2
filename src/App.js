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
        {!loginFlag ? <LogIn onFlagChange = {flagChange}/> : <Redirect to="/homapge"/>}
      </Route>
      <Route path="/signup" >
        <SignUp/>
      </Route>
      <Route path="/homepage" >
        {loginFlag ? <HomePage /> : <Redirect to="/"/>}
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
