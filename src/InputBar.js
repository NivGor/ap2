import './InputBar.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { HubConnectionBuilder } from '@microsoft/signalr';

function InputBar(props) {

    useEffect(() => { }, [props.chat]);
    const [newMessage, setNewMessage] = useState("")
    const [created, setCreated] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [messages, setMessages] = useState({})
    const [ connection, setConnection ] = useState(null);
    const [flag, setFlag] = useState(true)

    const newMessageChangeHandler = (event) => {
        setNewMessage(event.target.value)
    }

    async function buildConnection(){
        await connection.invoke("AddConnection", props.user.username)
        }

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5026/Hubs/Chat')
            .withAutomaticReconnect()
            .build();
        
        
        setConnection(newConnection);
    }, []);

     
    

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
                    connection.invoke("AddConnection", props.user.username)
                    connection.on('ReceiveMessage', message => {
                        if(connection.invoke('Authenticate', props.user.username)){
                        props.contact.messages.push(message);
                        props.setChats([...props.chats, message])
                        props.updateContactChat(props.user.username, props.contact.Id, message)
                        }
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    // useEffect(()=>{
    //     if(connection && connection.status == ""){
    //         connection.send("AddConnection", props.user.username)
    //     }

    // }, [connection, props.user.username])

    function getTime() {
        // var today = new Date();
        // var hours = today.getHours()
        // hours = parseInt(hours) < 10 ? "0" + hours : hours
        // var minutes = today.getMinutes()
        // minutes = parseInt(minutes) < 10 ? "0" + minutes : minutes
        // var time = hours + ":" + minutes + ", " + today.getDate() + "." + (parseInt(today.getMonth()) + 1) + "." + today.getFullYear() % 2000;
        return new Date().toString()
    }

    // async function postData(content, created) {

    //     try {
    //         let result = await fetch('http://localhost:5026/api/' + props.user.Username + '/Contacts/' + props.contact.Id + '/Messages', {
    //             method: 'post',
    //             mode: 'no-cors',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 Id:  '' + props.chats.length,
    //                 Content: content,
    //                 Created: created,
    //                 Sent: 'true'
    //             })
    //         })
    //     } catch(e) {
    //         console.log(e)
    //     }

    // function sendMSG(newMessage, created) {
    //     // Simple POST request with a JSON body using fetch
    //     const data = { id:  props.contact.messages.length,
    //         content: newMessage,
    //         created: "created",
    //         sent: true }
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(data)
    //     };
    //     fetch('http://localhost:5026/api/' + props.user.username + '/Contacts/' + props.contact.id + '/Messages', requestOptions)
    //         .then(response => response.json());
    // }
    async function sendMSG(newMessage, created, message) {
        await axios.post('http://localhost:5026/api/' + props.user.username + '/Contacts/' + props.contact.id + '/Messages',
                        {id:  props.contact.messages.length, content: newMessage, created: "created", sent: true },
                        {withCredentials: true})
        await axios.post('http://localhost:5026/api/Transfer',
                        {from: props.user.username, to: props.contact.id, content: newMessage},
                        {withCredentials: true});
        if (connection._connectionStarted) {
            try {
                await connection.send('SendMessage', message, props.contact.id);
            }
            catch(e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
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
        setCreated(getTime())
        var message = { id: props.chats.length, content: newMessage, Created: created, sent: true}
        var recieved = { id: props.chats.length, content: newMessage, Created: created, sent: false}
        sendMSG(newMessage, created, recieved)
        props.contact.messages.push(message)
        props.setChats([...chats, { id: props.chats.length, content: newMessage, Created: created, sent: true}])
        props.updateContactChat(props.user.username, props.contact.Id, { id: props.chats.length, content: newMessage, time: created, sent: true })
        setNewMessage("")
        var element = document.getElementById('chatBox')
        element.scrollTop = element.scrollHeight
    }

    return (
        <div className="input-group input-bar">

            <input type="text" className="form-control" placeholder='Type in your message...' aria-label="Text input with segmented dropdown button" onChange={newMessageChangeHandler} id="msgInput" />
            <button type="button" className="btn btn-outline-secondary  dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                <span className="visually-hidden">Toggle Dropdown</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-paperclip" viewBox="0 0 16 16">
                    <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                </svg>
            </button>
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