import './HomePage/HomePage.css';
import './InputBar';
import InputBar from './InputBar';
import { useState, useEffect, useCallback, useMemo } from 'react';

function ChatBox(props){
    const chats = props.chat
    const chatMessages = useMemo(() => {
        return chats.map(msg =>
            <li className="clearfix" key={msg.id}>
                <div className={"message-data " + (msg.sentByMe ? '' : 'text-right')}>
                    <span className="message-data-time">{msg.time}</span>
                </div>
                <div className={"message " + (msg.sentByMe ? 'my-message' : 'other-message float-right')}>
                    {!(msg.img) && msg.content} 
                    {msg.img && <a href={msg.imgSrc} target="_blank"><img src={msg.imgSrc} width={200} /></a>}
                     </div>
            </li>) || null
    }, [chats, props.updateContactChat, props.setChat, props.contact])
    return(
            <div className="list-group chat">
                <ul className="m-b-0 no-dot scroll">
                    {chatMessages}
                </ul>
                <InputBar onPopupChange={props.onPopupChange} chats={chats} user={props.user} contact={props.contact} setChats={props.setChat} updateContactChat={props.updateContactChat} />
            </div>
    );
}

export default ChatBox