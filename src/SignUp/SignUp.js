import './SignUp.css';
import { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

// var users = {
//     orAlmog: 123456,
//     NivGoren: 789456,
//     HemiLeibo: 111222
// };



function SignUp(props) {
    var regex = new RegExp("^(?=.*[0-9])(?=.*[A-z])")
    const [userNameError, setUserNameError] = useState("")
    const [passwordEror, setPasswordEror] = useState("")
    const [verPassError, setVerPassError] = useState("")

    
    const [name, setName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [verPass, setVerPass] = useState('');
    const nameChangeHandler = (event) => {
        setName(event.target.value)
    }
    const displayNameChangeHandler = (event) => {
        setDisplayName(event.target.value)
    }
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value)
    }
    const verPassChangeHandler = (event) => {
        setVerPass(event.target.value)
    }

    const passCheck = () => {
        if(password != verPass){
            setVerPassError("The 2 passwords don't match")
        } else {
            setVerPassError("")
        } 
        if((password.search(/[A-z]/) < 0) || (password.search(/[0-9]/) < 0) || (password.length < 6)){
            setPasswordEror("The password must contain at least 6 characters with at least 1 character and 1 number")
        } else {
            setPasswordEror("")
        }
    }
    
    const submitHandler = (event) => {
        event.preventDefault()
        console.log(event)
        passCheck()
        if (name in props.users) {
            console.log("user logged in");
        } else {
            props.onUsersChange(...props.users, {userName: name, displayName: displayName, password: password})
        }
        console.log(props.users)
        console.log("event")
    }

    return (
        <div>
            <div className='login'>
                <form name="login"  onSubmit={submitHandler}>
                    <div className="form-group user">
                        <label htmlFor="userName"><h5>Username</h5></label>
                        <input type="text" onChange={nameChangeHandler} name="user" className="form-control" id="userName" placeholder="Enter Username" required></input>
                        <div>{userNameError}</div>
                        <br></br>
                    </div>
                    <div className="form-group nick">
                        <label htmlFor="nick"><h5>Display Name</h5></label>
                        <input type="text" onChange={displayNameChangeHandler} name="nick" className="form-control" id="nick" placeholder="Display Name" required></input>
                    </div>
                    <br></br>
                    <div className="form-group password">
                        <label htmlFor="password"><h5>Password</h5></label>
                        <input type="password" onChange={passwordChangeHandler} name="password" className="form-control" id="password" placeholder="Password" required></input>
                        <div>{passwordEror}</div>
                    </div>
                    <br></br>
                    <div className="form-group password">
                        <label htmlFor="password"><h5>Verify password</h5></label>
                        <input type="password" onChange={verPassChangeHandler} name="password" className="form-control" id="verpass" placeholder="Verify password" required></input>
                        <div>{verPassError}</div>
                    </div>
                    <br></br>
                    {/* <Link to='/homepage'> */}
                    <button type="submit" className="btn btn-primary logButton">Sign Up</button>
                    {/* </Link> */}
                </form>
            </div>
        </div>
    );
}

export default SignUp;