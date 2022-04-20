import './LogIn.css';
import { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function LogIn(props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const nameChangeHandler = (event) => {
        setName(event.target.value)
        console.log("name = " + event.target.value);
    }
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value)
        console.log("pass = " + event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault()
        console.log(event)
        if (props.users.users.find(x=>x.userName === name) && props.users.users.find(x=>x.userName === name).password == password) {
        // if (usersList.find(x=>x.userName === name) && usersList.find(x=>x.userName === name).password == password) {
            console.log("user logged in");
            props.onFlagChange();
        } else {
            console.log(props.users.users);
            console.log("no");
        }
    }

    return (
        <div>
            <div className='login'>
                <form name="login" >
                    <div className="form-group user">
                        <label htmlFor="userName"><h5>Username</h5></label>
                        <input name="user" className="form-control" id="userName" placeholder="Enter Username" onChange={nameChangeHandler} required></input>
                        <br></br>
                    </div>
                    <div className="form-group password">
                        <label htmlFor="password"><h5>Password</h5></label>
                        <input type="password" name="password" className="form-control" id="password" placeholder="Password" onChange={passwordChangeHandler} required></input>
                    </div>
                    <br></br>
                    <Link to='/homepage'>
                    <button type="submit" className="btn btn-primary logButton" onClick = {submitHandler}>Login</button>
                    </Link>
                    <Link to='/signup' className="btn btn-link signButton" >Register now</Link>
                    {/* <Link to='/homepage' className="btn btn-link signButton" >HomePage now</Link> */}
                </form>
            </div>
        </div>
    );
}

export default LogIn;