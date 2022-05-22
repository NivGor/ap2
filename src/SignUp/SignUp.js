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


    function signUser(name, displayName, password) {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username:  name,
                                displayName: displayName,
                                password: password,
                                contacts: [] })
        };
        fetch('http://localhost:5026/api/Users', requestOptions)
            .then(response => response.json());
    }

    useEffect(()=>{
        setIsValidForm((NameError == "")&&(displayNameError == "")&&(passwordError == "")&&(verPassError == ""))
    }, [NameError, displayNameError, passwordError, verPassError])

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
        if (props.users.find(x=>x.username === name)) {
            setNameError("This username is currently in use")
        } else {
            setNameError("")
        }
        if (name == "") {
            setNameError("Username is required")
        } else {
            setDisplayNameError("")
        }
        if (displayName == "") {
            setDisplayNameError("Display Name is required")
        } else {
            setDisplayNameError("")
        }

    }, [name, displayName])

    useEffect(() => {
        if (password != verPass) {
            setVerPassError("The 2 Passwords Don't Match")
        } else {
            setVerPassError("")
        }
        if ((password.search(/[A-z]/) < 0) || (password.search(/[0-9]/) < 0) || (password.length < 6)) {
            setPasswordError("The Password Must Contain at Least 6 Characters With at Least 1 Letter and 1 Number")
        } else {
            setPasswordError("")
        }
    }, [password, verPass])
    
    const clickHandler = (event) => {
        if(isValidForm) {
            props.onUsersChange([...props.users, {Username: name, displayName: displayName, password: password, contacts: []}])
            signUser(name, displayName, password)
        }
    }
    const submitHandler = (event) => {
        event.preventDefault()
    }

    return (
            <div className='login' onSubmit={submitHandler}>
                <form name="login">
                    <div className="form-group user">
                        <label htmlFor="Username"><h5>Username</h5></label>
                        <input type="text" onChange={nameChangeHandler} name="user" className="form-control" id="Username" placeholder="Enter Username" required></input>
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
                    <button type="submit" className="btn btn-primary logButton"  onClick={clickHandler}>Sign Up</button>
                    </Link>}
                    {!isValidForm && 
                    <button type="button" className="btn btn-primary logButton" onClick={clickHandler}>Sign Up</button>}
                </form>
            </div>
    );
}

export default SignUp;