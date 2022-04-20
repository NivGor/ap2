import './SignUp.css';
import { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function SignUp(props) {
    const [userNameError, setUserNameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
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
            setPasswordError("The password must contain at least 6 characters with at least 1 character and 1 number")
        } else {
            setPasswordError("")
        }
    }
    
    const submitHandler = (event) => {
        event.preventDefault()
        console.log(event)
        console.log(props.users)
        passCheck()
        if (props.users.users.find(x=>x.userName === name)) {
        // if (usersList.find(x=>x.userName === name)) {
            setUserNameError("This user name is currently in use")
        } else {
            props.users.addUser({userName: name, displayName: displayName, password: password})
            console.log(props.users)
            setUserNameError("")
        }
        console.log(props.users.users)
        console.log("event")
    }

    return (
        <div>
            <div className='login'>
                <form name="login" onSubmit={submitHandler}>
                    <div className="form-group user">
                        <label htmlFor="userName"><h5>Username</h5></label>
                        <input type="text" onChange={nameChangeHandler} name="user" className="form-control" id="userName" placeholder="Enter Username" required></input>
                        <div className="error">{userNameError}</div>
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
                        <div className="error">{passwordError}</div>
                    </div>
                    <br></br>
                    <div className="form-group password">
                        <label htmlFor="password"><h5>Verify password</h5></label>
                        <input type="password" onChange={verPassChangeHandler} name="password" className="form-control" id="verpass" placeholder="Verify password" required></input>
                        <div className="error">{verPassError}</div>
                    </div>
                    <br></br>
                    <Link to='/'>
                    <button type="submit" className="btn btn-primary logButton" >Sign Up</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default SignUp;