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
        const msgInput = document.getElementById("msgInput")
        msgInput.value = ""
        var chats = props.chats
        props.setChats([...chats, { id: props.chats.length, content: newMessage, time: getTime(), sentByMe: true }])
        props.updateContactChat(props.user.userName, props.contact.userName, { id: props.chats.length, content: newMessage, time: getTime(), sentByMe: true })
        setNewMessage("")
    }

    const uploadPhoto = () => {
        props.onPopupChange()
    }

    return (
        <div className="input-group input-bar">
         
            {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button> */}

            <div className="modal fade" id="photoUpload" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <input type="text" className="form-control" aria-label="Text input with segmented dropdown button" onChange={newMessageChangeHandler} id="msgInput" />
            <button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu">
                <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#photoUpload" onClick={uploadPhoto}>Upload a Photo</button></li>
                <li><button className="dropdown-item" >Upload a Video</button></li>
                <li><button className="dropdown-item" >Voice Message</button></li>
                <li><button className="dropdown-item" >Upload a File</button></li>
            </ul>
            {newMessage !== "" && <button type="button" className="btn btn-outline-secondary" onClick={clickHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                </svg>
            </button>}
            {newMessage === "" && <button type="button" className="btn btn-outline-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                </svg>
            </button>}
        </div>
    );
}

export default InputBar