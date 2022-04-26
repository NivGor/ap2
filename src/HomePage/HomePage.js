import { useCallback, useState, useEffect } from 'react';
import './HomePage.css';
import '../InputBar';
import InputBar from '../InputBar';
import ChatBox from '../ChatBox';
import Popup from '../Popup';
import { render } from '@testing-library/react';

function HomePage(props) {
    var user = props.user
    const [contacts, setContacts] = useState(props.user.contacts)
    const [userContact, setUserContact] = useState(contacts[0])
    const [buttonPopup, setButtonPopup] = useState(false)
    const [newContact, setNewContact] = useState("")
    const [isContactValid, setIsContactValid] = useState(false)
    const [contactValidError, setContactValidError] = useState("")

    const clickHandler = (contact) => {
        setUserContact(contact)
        var input = document.getElementById('msgInput')
        input.value = ''
    }

    const setUserContactChat = useCallback((chat) => {
        setUserContact({ ...userContact, chat })
    }, [userContact, setUserContact])

    const onPopupChange = () => {
        setButtonPopup(!buttonPopup)
    }

    useEffect(() => {
        var users = props.allUsers
        let isExist = users.find(x => x.userName === newContact)
        let isContactAlready = contacts.find(x => x.userName === newContact)
        let isMyself = newContact === user.userName
        if (isExist && !isContactAlready && !isMyself) {
            setContactValidError("")
            setIsContactValid(true)
        }
        else {
            setIsContactValid(false)
             if (!isExist) {
                setContactValidError("This username doesn't exist")
             }
             if (isContactAlready) {
                setContactValidError("This user is already a contact")
             }
             if (isMyself) {
                setContactValidError("You can't add yourself")
             }
        }
    }, [newContact])

    const contactChangeHandler = (event) => {
        setNewContact(event.target.value)
    }
    
    const clearInput = () => {
        let input = document.getElementById('add-contact')
        input.value = ''
    }

    useEffect(()=>{
        setContacts(props.contacts)
    },[props.contacts, contacts])

    const addContact = () => {
        let foundContact = props.allUsers.find(x => x.userName === newContact)
        props.updateContacts({ userName: newContact, displayName: foundContact.displayName, chat: [], img: foundContact.img })
        setContacts([...contacts])
        clearInput()
        setContactValidError("")
        console.log("**************************")
        console.log(props.contacts)
    }

    return (
        <div className='homePage'>
            <div className="header">
                <div className="card mb-3 left-header mb-3">
                    <div className="row g-0">
                        <div className="col-2">
                            <img src={user.img} className="img-fluid rounded-start me profile-pic" alt="avatar" />
                        </div>
                        <div className="col-8">
                            <div className="card-title">
                                <h3 className='user-name'>{user.displayName}</h3>
                            </div>
                        </div>
                        <div className="col-2">
                            <button type="button" className="btn btn-secondary add-contact" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                    <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                                </svg>
                            </button>
                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Add contact</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={clearInput} aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <input className="form-control" placeholder="Type in contact's username" id="add-contact" type="text" onChange={contactChangeHandler} />
                                        </div>
                                        <div className='modal-error'>
                                            {contactValidError}
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={clearInput}>Close</button>
                                            {!isContactValid && <button type="button" className="btn btn-primary" >Add</button>}
                                            {isContactValid && <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={addContact}>Add</button>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mb-3 right-header mb-3">
                    <div className="row g-0">
                        <div className="col-1">
                            <img src={userContact.img} className="img-fluid rounded-start me profile-pic" alt="avatar" />
                        </div>
                        <div className="col-11">
                            <div className="card-title">
                                <h3 className='user-name'>{userContact.displayName}</h3>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main">
                <div className="side-menu">
                    {contacts && contacts.map(contact =>
                        <div className="card mb-3 contact" onClick={() => clickHandler(contact)}>
                            <div className="row g-0">
                                <div className="col-2">
                                    {console.log(contact.img)}
                                    <img src={contact.img} className="img-fluid rounded-start profile-pic" alt="avatar" />
                                </div>
                                <div className="col-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{contact.displayName}</h5>
                                        {contact.chat.length !== 0 &&
                                        <p className="card-text msg-preview">{contact.chat[contact.chat.length - 1].sentByMe ? 'You' : contact.displayName}: "{contact.chat[contact.chat.length - 1].content}".</p>}
                                    </div>
                                </div>
                                <div className="col-2">
                                {contact.chat.length !== 0 && <small className="text-muted">{contact.chat[contact.chat.length - 1].time}</small> }
                                </div>
                            </div>
                        </div>)}




                    {/* <div className='contact card mb-3'>
                            <button className="contact btn btn btn-primary" key={contact.userName} onClick={() => clickHandler(contact)}>
                                <div className="user">
                                    <span className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-circle myName" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                        </svg>
                                    </span>
                                    <div className="user-name">{user.userName}</div>
                                </div>
                                <h6 className='last-msg'>
                                    {contact.chat[contact.chat.length - 1].sentByMe ? 'You' : contact.displayName}: "{contact.chat[contact.chat.length - 1].content}"
                                </h6>
                            </button></div>)} */}

                    {/* {contacts && contacts.map(contact =>
                        <button className="list-group-item list-group-item-action primary" key={contact.userName} onClick={() => clickHandler(contact)}>
                            <div className="list-group-item primary">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                    </svg>
                                </span>
                                <span className='item'>{contact.displayName}</span>
                                {contact.chat.length !== 0 &&
                                    <div>
                                        <h6>
                                            <span className="new-msg" >
                                                {contact.chat[contact.chat.length - 1].sentByMe ? 'You' : contact.displayName}: "{contact.chat[contact.chat.length - 1].content}"
                                            </span><span className="badge bg-secondary">New</span>
                                        </h6>
                                        <div className='data-time'>
                                            {contact.chat[contact.chat.length - 1].time}
                                        </div>
                                    </div>}
                            </div>
                        </button>)} */}
                </div>
                <div className="content">
                    <ChatBox chat={userContact.chat} setChat={setUserContactChat} user={user} contact={userContact} updateContactChat={props.updateContactChat} onUserContactChange={setUserContact} onPopupChange={onPopupChange} />
                </div>
            </div>
        </div>
    );
}

export default HomePage;