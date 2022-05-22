import './ChatBox.css';
import './InputBar';
import InputBar from './InputBar';
import { useState, useEffect, useCallback, useMemo } from 'react';

function ChatBox(props){
    const chats = props.chat
    useEffect(() => {
        var element = document.getElementById('chatBox')
        element.scrollTop = element.scrollHeight
    }, [chats])
    const chatMessages = useMemo(() => {
        return chats && chats.map(msg =>
            <div className="clearfix" key={msg.id}>
                <div className={"message-data " + (msg.sent ? '' : 'text-right')}>
                    <span className="message-data-time">{msg.Created}</span>
                </div>
                <div className={"message " + (msg.sent ? 'my-message' : 'other-message float-right')}>{msg.content}</div> 
            </div>)
    }, [chats, props.updateContactChat, props.setChat, props.contact])
    return(
        <div className="chat-container">
            <div className="messages" id="chatBox">
                {chatMessages}
            </div>
            {props.contact == "" ? "" : <InputBar onPopupChange={props.onPopupChange} chats={chats} user={props.user} contact={props.contact} setChats={props.setChat} updateContactChat={props.updateContactChat} />}
        </div>
    );
}

export default ChatBox