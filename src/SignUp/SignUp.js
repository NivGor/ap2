import './SignUp.css';
import { useState } from 'react';

// var users = {
//     orAlmog: 123456,
//     NivGoren: 789456,
//     HemiLeibo: 111222
// };



function SignUp() {
    var regex = new RegExp(/^(?=.*\d)(?=.*[A-z]).{6,15}$/)

    const [users, setUsers] = useState([
        { userName: "NivGor", displayName: "NivGor", password: "123456"},
        { userName: "OrAlmog", displayName: "Or", password:"password"},
        { userName: "Tony Stark", displayName: "Iron man", password:"iamironman"}
        ]);
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
        //if the password is empty
        if(password != verPass){
            console.log('no!')
        } else if(regex.test(password)){
            console.log('no!')
        }
    }
    
    const submitHandler = (event) => {
        console.log(event)
        if (name in users) {
            console.log("user logged in");
        } else {
            setUsers(...users, {userName: name, displayName: displayName, password: password})
        }
    }

    return (
        <div>
            <div className='login'>
                <form name="login">
                    <div className="form-group user">
                        <label htmlFor="userName"><h5>Username</h5></label>
                        <input type="text" onChange={nameChangeHandler} name="user" className="form-control" id="userName" placeholder="Enter Username" required></input>
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
                    </div>
                    <br></br>
                    <div className="form-group password">
                        <label htmlFor="password"><h5>Verify password</h5></label>
                        <input type="password" onChange={verPassChangeHandler} name="password" className="form-control" id="password" placeholder="Verify password" required></input>
                    </div>
                    <br></br>
                
                    <button type="submit" className="btn btn-primary logButton">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;