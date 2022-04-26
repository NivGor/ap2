import './InputBar.css';
import { useState, useEffect } from 'react';
import Popup from './Popup';
import RecordAudio from './RecordAudio';
import UploadVideo from './UploadVideo';

function InputBar(props) {

    useEffect(() => { }, [props.chat]);
    const [newMessage, setNewMessage] = useState("")
    const [isTyping, setIsTyping] = useState(false)

    const newMessageChangeHandler = (event) => {
        setNewMessage(event.target.value)
    }

    function getTime() {
        var today = new Date();
        var hours = today.getHours()
        hours = parseInt(hours) < 10 ? "0" + hours : hours
        var minutes = today.getMinutes()
        minutes = parseInt(minutes) < 10 ? "0" + minutes : minutes
        var time = hours + ":" + minutes + ", " + today.getDate() + "." + (parseInt(today.getMonth()) + 1) + "." + today.getFullYear() % 2000;
        return time
    }


    useEffect(() => {
        var input = document.getElementById("msgInput");
        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                document.getElementById("send-msg").click();
            }
        });
    }, [newMessage])


    const clickHandler = () => {
        const msgInput = document.getElementById("msgInput")
        msgInput.value = ""
        var chats = props.chats
        props.setChats([...chats, { id: props.chats.length, content: newMessage, time: getTime(), sentByMe: true, type: "text" }])
        props.updateContactChat(props.user.userName, props.contact.userName, { id: props.chats.length, content: newMessage, time: getTime(), sentByMe: true, type: "text" })
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
            <Popup user={props.user} contact={props.contact} chat={props.chats} setChat={props.setChats} updateContactChat={props.updateContactChat} getTime={getTime} />
            <RecordAudio user={props.user} contact={props.contact} chat={props.chats} setChat={props.setChats} updateContactChat={props.updateContactChat} getTime={getTime} />
            <UploadVideo user={props.user} contact={props.contact} chat={props.chats} setChat={props.setChats} updateContactChat={props.updateContactChat} getTime={getTime} />

            {/* </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div> */}
            <input type="text" className="form-control" placeholder='Type in your message...' aria-label="Text input with segmented dropdown button" onChange={newMessageChangeHandler} id="msgInput" />
            <button type="button" className="btn btn-outline-secondary  dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                <span className="visually-hidden">Toggle Dropdown</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-paperclip" viewBox="0 0 16 16">
                    <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                </svg>
            </button>
            <ul className="dropdown-menu">
                <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#photoUpload" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                </svg>     Upload a Photo</button></li>
                <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#videoUpload"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-film" viewBox="0 0 16 16">
                    <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z" />
                </svg>           Upload a Video</button></li>
                <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#recordAudio" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mic-fill" viewBox="0 0 16 16">
                    <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
                    <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                </svg>          Voice Message</button></li>
            </ul>
            {newMessage !== "" && <button type="button" id="send-msg" className="btn btn-outline-secondary" onClick={clickHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
            </button>}
            {newMessage === "" && <button type="button" id="send-msg" className="btn btn-outline-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
            </button>}
        </div>
    );
}

export default InputBar