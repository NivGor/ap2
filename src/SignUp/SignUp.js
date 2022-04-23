import './SignUp.css';
import { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function SignUp(props) {
    

    const [isValidForm, setIsValidForm] = useState(false)
    const [NameError, setNameError] = useState("")
    const [displayNameError, setDisplayNameError] = useState("")
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

    useEffect (() => {
        if (props.users.find(x=>x.userName === name)) {
            setNameError("This user name is currently in use")
            setIsValidForm(false)   
        } else {
            setIsValidForm(true)
            setNameError("")
        }
        if (name == "") {
            setNameError("Username is required")
            setIsValidForm(false)
        } else {
            setIsValidForm(true)
            setDisplayNameError("")
        }
        if (displayName == "") {
            setDisplayNameError("Display name is required")
            setIsValidForm(false)
        } else {
            setIsValidForm(true)
            setDisplayNameError("")
        }

    }, [name, displayName])

    useEffect(() => {
        if (password != verPass) {
            setVerPassError("The 2 passwords don't match")
            setIsValidForm(false)
        } else {
            setIsValidForm(true)
            setVerPassError("")
        }
        if ((password.search(/[A-z]/) < 0) || (password.search(/[0-9]/) < 0) || (password.length < 6)) {
            setPasswordError("The password must contain at least 6 characters with at least 1 character and 1 number")
            setIsValidForm(false)
        } else {
            setIsValidForm(true)
            setPasswordError("")
        }
    }, [password, verPass])
    
    const clickHandler = (event) => {
        console.log(isValidForm)
        if(isValidForm) {
            props.onUsersChange([...props.users, {userName: name, displayName: displayName, password: password}])
        }
        console.log(props.users)
        console.log("event")
    }

    return (
        <div>
            <div className='login'>
                <form name="login">
                    <div className="form-group user">
                        <label htmlFor="userName"><h5>Username</h5></label>
                        <input type="text" onChange={nameChangeHandler} name="user" className="form-control" id="userName" placeholder="Enter Username" required></input>
                        <div className="error">{NameError}</div>
                        <br></br>
                    </div>
                    <div className="form-group nick">
                        <label htmlFor="nick"><h5>Display Name</h5></label>
                        <input type="text" onChange={displayNameChangeHandler} name="nick" className="form-control" id="nick" placeholder="Display Name" required></input>
                        <div className="error">{displayNameError}</div>
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

                    {isValidForm && 
                    <Link to='/'>
                    <button type="submit" className="btn btn-primary logButton" onClick={clickHandler}>Sign Up</button>
                    </Link>}
                    {!isValidForm && 
                    <button type="button" className="btn btn-primary logButton" onClick={clickHandler}>Sign Up</button>}
                </form>
            </div>
        </div>
    );
}

export default SignUp;