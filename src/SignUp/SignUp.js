import './SignUp.css';

var users = {
    orAlmog: 123456,
    NivGoren: 789456,
    HemiLeibo: 111222
};

function submitHandler() {
    let user = document.forms["loginForm"]["user"].value;
    let pass = document.forms["loginForm"]["password"].value;
    console.log(user);
    console.log(pass);
    if (users[user] == pass){
        console.log("yes");
    } else {
        console.log("no");
    }
    
}

function SignUp() {
    return (
        <div>
            <div className='login'>
                <form name="login">
                    <div className="form-group user">
                        <label htmlFor="userName"><h5>Username</h5></label>
                        <input type="text" name="user" className="form-control" id="userName" placeholder="Enter Username" required></input>
                        <br></br>
                    </div>
                    <div className="form-group password">
                        <label htmlFor="password"><h5>Password</h5></label>
                        <input type="password" name="password" className="form-control" id="password" placeholder="Password" required></input>
                    </div>
                    <br></br>
                    <div className="form-group nick">
                        <label htmlFor="nick"><h5>Display Name</h5></label>
                        <input type="text" name="nick" className="form-control" id="nick" placeholder="Display Name" required></input>
                    </div>
                    <br></br>
                    <button type="submit" className="btn btn-primary logButton">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;