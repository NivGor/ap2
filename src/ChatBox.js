import './ChatBox.css';
import './InputBar';
import InputBar from './InputBar';
import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';



function ChatBox(props){

    // const [messages, setMessages] = useState(props.contact.messages)

    // useEffect(() => {
    //     async function getContacts(){
    //         axios.get('http://localhost:5026/api/' + props.user.username + '/Contacts' + props.contact.id + '/Messages').then(res => {
    //         setMessages(res.data)
    //         })
    //     }
    //     getContacts()
    // },[]);

    // const chats = props.chat
    useEffect(() => {
        var element = document.getElementById('chatBox')
        element.scrollTop = element.scrollHeight
    }, [messages])
    var messages = props.contact.messages
    const chatMessages = useMemo(() => {
        return messages && messages.map(msg =>
            <div className="clearfix" key={msg.id}>
                <div className={"message-data " + (msg.sent ? '' : 'text-right')}>
                    <span className="message-data-time">{msg.created}</span>
                </div>
                <div className={"message " + (msg.sent ? 'my-message' : 'other-message float-right')}>{msg.content}</div> 
            </div>)
    }, [messages, props.contact])
    return(
        <div className="chat-container">
            <div className="messages" id="chatBox">
                {chatMessages}
            </div>
            {props.contact == "" ? "" : <InputBar onPopupChange={props.onPopupChange} chats={messages} user={props.user} contact={props.contact} setChats={props.setChat} updateContactChat={props.updateContactChat} />}
        </div>
    );
}

export default ChatBox