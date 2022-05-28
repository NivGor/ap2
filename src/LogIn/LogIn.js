import './LogIn.css';
import SignUp from '../SignUp/SignUp';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import { useState, useEffect } from 'react';
  import axios from 'axios';

// var users = {
//     orAlmog: 123456,
//     NivGoren: 789456,
//     HemiLeibo: 111222
// };

function LogIn(props) {

    async function login() {
        var res = await axios.get('http://localhost:5026/api/Login?username=' + name + '&password=' + password, {withCredentials: true})
        var user = res.data
            if (user == "") {
                setError("username and/or password are incorrect!")
            } else {
            props.logInUser(user)
            props.onFlagChange();
        }
    }
    const[error,setError] = useState("")
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const errorChangeHandler = () => {
        setError("username and/or password are incorrect!")
    }

    const nameChangeHandler = (event) => {
        setName(event.target.value)
    }
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        // if (props.users.find(x=>x.username === name) && props.users.find(x=>x.username === name).password == password) {
        //     props.logInUser(name)
        //     props.onFlagChange();
        // } else {
        // }
        login()
        errorChangeHandler()
    }

    return (
            <div className='login'>
                <form name="login" >
                    <div className="form-group user">
                        <label htmlFor="username"><h5>username</h5></label>
                        <input name="user" className="form-control" id="username" placeholder="Enter username" onChange={nameChangeHandler} required></input>
                        <br></br>
                    </div>
                    <div className="form-group password">
                        <label htmlFor="password"><h5>Password</h5></label>
                        <input type="password" name="password" className="form-control" id="password" placeholder="Password" onChange={passwordChangeHandler} required></input>
                    </div>
                    <div className="error">{error}</div>
                    <br></br>
                    <Link to='/homepage'>
                    <button type="submit" className="btn btn-primary logButton" onClick = {submitHandler}>Login</button>
                    </Link>
                    <Link to='/signup' className="btn btn-link signButton" >Register now</Link>
                    <a href='http://localhost:5042/'>
            <button type='button' className="btn btn-secondary" >Rate us here!</button>
            </a>
                </form>
            </div>
    );
}

export default LogIn;