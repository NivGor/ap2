import './ChatBox.css';
import './InputBar';
import InputBar from './InputBar';
import { useState, useEffect, useCallback, useMemo } from 'react';

function ChatBox(props){
    const chats = props.chat
    const chatMessages = useMemo(() => {
        return chats.map(msg =>
            <div className="clearfix" key={msg.id}>
                <div className={"message-data " + (msg.sentByMe ? '' : 'text-right')}>
                    <span className="message-data-time">{msg.time}</span>
                </div>
                <div className={"message " + (msg.sentByMe ? 'my-message' : 'other-message float-right')}>
                    {msg.type === "text" && msg.content} 
                    {msg.type === "img" && <a href={msg.source} target="_blank"><img src={msg.source} width={200} /></a>}
                    {msg.type === "audio" && <audio src={msg.source} controls></audio>}
                    {msg.type === "video" && <video width={500} controls>
                        <source src={msg.source} type="video/mp4"></source>
                        <source src="movie.ogg" type="video/ogg"></source>
                            </video>}
                     </div>
            </div>) || null
    }, [chats, props.updateContactChat, props.setChat, props.contact])
    return(
        <div className="chat-container">
            <div className="messages" id="chatBox">
                {chatMessages}
            </div>
            <InputBar onPopupChange={props.onPopupChange} chats={chats} user={props.user} contact={props.contact} setChats={props.setChat} updateContactChat={props.updateContactChat} />
        </div>
    );
}

export default ChatBox