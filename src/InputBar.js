import './InputBar.css';
import { useState, useEffect } from 'react';
import Popup from './Popup';
import RecordAudio from './RecordAudio';
import UploadVideo from './UploadVideo';

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
        var element = document.getElementById('chatBox')
        element.scrollTop = element.scrollHeight
    }

    return (
        <div className="input-group input-bar">
         
            {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button> */}

            {/* <div className="modal fade" id="photoUpload" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body"> */}
                            <Popup user={props.user} contact={props.contact} chat={props.chats} setChat={props.setChats} updateContactChat={props.updateContactChat} getTime={getTime}/>
                            <RecordAudio user={props.user} contact={props.contact} chat={props.chats} setChat={props.setChats} updateContactChat={props.updateContactChat} getTime={getTime}/>
                            <UploadVideo user={props.user} contact={props.contact} chat={props.chats} setChat={props.setChats} updateContactChat={props.updateContactChat} getTime={getTime}/>

                        {/* </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div> */}
            <input type="text" className="form-control" aria-label="Text input with segmented dropdown button" onChange={newMessageChangeHandler} id="msgInput" />
            <button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu">
                <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#photoUpload" >Upload a Photo</button></li>
                <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#videoUpload">Upload a Video</button></li>
                <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#recordAudio" >Voice Message</button></li>
                <li><button className="dropdown-item" >Upload a File</button></li>
            </ul>
            {newMessage !== "" && <button type="button" className="btn btn-outline-secondary" onClick={clickHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
            </button>}
            {newMessage === "" && <button type="button" className="btn btn-outline-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
            </button>}
        </div>
    );
}

export default InputBar