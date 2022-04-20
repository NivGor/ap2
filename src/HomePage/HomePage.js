import { useState } from 'react';
import './HomePage.css';



function HomePage() {

    const [Users, setUsers] = useState([
        { userName: "NivGor", displayName: "NivGor", password: "123456"},
        { userName: "OrAlmog", displayName: "Or", password:"password"},
        { userName: "Tony Stark", displayName: "Iron man", password:"iamironman"}
        ]);
        
        var msg = "Hi, whats up?";

    return (
        <div className='coantainer-fluid HomePage'>
            <div className="row">
                <div className="col-4 icon">
                    <div>
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-circle myName" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>
                        </span>
                        <span className="myName">NivGor</span>
                    </div>
                    <ul className="list-group">
                    {Users && Users.map(user =>
                         <button className="list-group-item list-group-item-action primary" key = {user.userName}>
                        <li className="list-group-item primary">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg>
                            </span>
                            <span className='item'>{user.displayName}</span>
                            <h6><span className="new-msg" >{user.displayName}: "{msg}"</span><span className="badge bg-secondary">New</span></h6>
                    </li>
                    </button>)}
                    </ul> 
                </div>
                <div className="col-8 icon">
                    <div className = "username">
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-circle myName" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>
                        </span>
                        <span className="myName">NivGor</span>
                    </div>
                    <div className="list-group chat">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;