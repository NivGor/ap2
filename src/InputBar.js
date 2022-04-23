import './InputBar.css';
import { useState, useEffect } from 'react';

function InputBar(props){

    useEffect(() => {}, [props.chat]);
    const [newMessage, setNewMessage] = useState("")

    const newMessageChangeHandler = (event) => {
        setNewMessage(event.target.value)
    }
    
    function getTime() {
        var today = new Date();
        var time = "Today, " + today.getHours() + ":" + today.getMinutes();
        return time
    }

    const clickHandler = () => {
        document.getElementById('msgInput').value = ''
        var chats = props.chats
        props.setChats([...chats, {id: props.chats.length, content: newMessage, time: getTime(), sentByMe: true}])
        props.updateContactChat(props.user.userName, props.contact.userName, {id: props.chats.length, content: newMessage, time: getTime(), sentByMe: true})
        setNewMessage("")
    }

    return(
        <div className="input-group input-bar">
            <input type="text" className="form-control" aria-label="Text input with segmented dropdown button" onChange={newMessageChangeHandler} id="msgInput"/>
            <button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Upload a Photo</a></li>
                <li><a className="dropdown-item" href="#">Upload a Video</a></li>
                <li><a className="dropdown-item" href="#">Voice Message</a></li>
                <li><a className="dropdown-item" href="#">Upload a File</a></li>
            </ul>
            <button type="button" className="btn btn-outline-secondary" onClick={clickHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                </svg>
            </button>
        </div>
    );
}

export default InputBar