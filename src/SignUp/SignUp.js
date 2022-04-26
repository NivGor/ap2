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
    const[isFilePicked,setIsFilePicked]= useState(false)
    const[notImgError,setNotImgError]= useState("")
    
    const [name, setName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [verPass, setVerPass] = useState('');
    const[selectedFile,setSelectedFile]= useState('');

    useEffect(()=>{
        setIsValidForm((NameError == "")&&(displayNameError == "")&&(passwordError == "")&&(verPassError == "")&&(notImgError == ""))
    }, [NameError, displayNameError, passwordError, verPassError, notImgError])

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
        if (selectedFile == "") {
            setNotImgError("Profile pic is required")
            setIsFilePicked(false)
        } else {
            setNotImgError("")
        }

    }, [name, displayName, selectedFile])

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
            props.onUsersChange([...props.users, {userName: name, displayName: displayName, password: password, contacts: props.contacts, img: URL.createObjectURL(selectedFile)}])
        }
    }
    const submitHandler = (event) => {
        event.preventDefault()
    }

    const selectPhoto = (event) => {
        let file = event.target.files[0]
        if(!file.type.includes("image")){
          let fileSelected = document.getElementById('file');
          fileSelected.value = ""
          setNotImgError("Please Choose A JPEG/PNG File")
          setIsFilePicked(false)
        } else {
            setNotImgError("")
            setSelectedFile(event.target.files[0]);
            setIsFilePicked(true);
          }
      };

    return (
            <div className='login' onSubmit={submitHandler}>
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
                    <div className="form-group password">
                        <label htmlFor="password"><h5>Upload Photo</h5></label>
                        <input type="file" onChange={selectPhoto} name="img" className="form-control" id="file" accept='image/jpeg, image/png' required></input>
                        <div className="error">{notImgError}</div>
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