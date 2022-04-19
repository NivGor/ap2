import './LogIn.css';
import SignUp from '../SignUp/SignUp';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import { useState } from 'react';

// var users = {
//     orAlmog: 123456,
//     NivGoren: 789456,
//     HemiLeibo: 111222
// };

function LogIn(props) {
    const [users, setUsers] = useState([
        { userName: "NivGor", displayName: "NivGor", password: "123456"},
        { userName: "OrAlmog", displayName: "Or", password:"password"},
        { userName: "Tony Stark", displayName: "Iron man", password:"iamironman"}
        ]);
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
        console.log(event)
        if (users.find(x=>x.userName === name) && users.find(x=>x.userName === name).password == password) {
            console.log("user logged in");
            props.onFlagChange();
        } else {
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