import { useCallback, useState, useEffect } from 'react';
import './HomePage.css';
import '../InputBar';
import InputBar from '../InputBar';
import ChatBox from '../ChatBox';
import Popup from '../Popup';
import { render } from '@testing-library/react';



function HomePage(props) {
    var user = props.user
    const[contacts, setContacts] = useState(props.user.contacts)
    const [userContact, setUserContact] = useState(contacts[0])
    const [buttonPopup, setButtonPopup] = useState(false)
    const[newContact, setNewContact] = useState("")
    const[isContactExist, setIsContactExist] = useState(false)
    const[contactExistError, setContactExistError] = useState("")
    const clickHandler = (contact) => {
        setUserContact(contact)
        console.log(contact)
        console.log(userContact)
    }

    const setUserContactChat = useCallback((chat) => {
        setUserContact({...userContact, chat })
    }, [userContact, setUserContact])

    const onPopupChange = () => {
        setButtonPopup(!buttonPopup)
    }

    useEffect(()=>{
        var users = props.allUsers
        if(users.find(x=>x.userName === newContact) && newContact !== user.userName){
            setContactExistError("")
            setIsContactExist(true)
        } else {
            if(newContact === user.userName) {
                setContactExistError("A user cannot add itself to it's contacts")
            } else {
                setContactExistError("This user name doesn't exist")
            }
        }
    }, [newContact])

    // useEffect(()=>{
    //     console.log("yyyyyyyyyyyyyyeeeeeeeeeeeeeeeeeeeeessssssssssssssss")
    //     setNewContact("")
    // }, [contacts, props.updateContacts, props.contacts])

    const contactChangeHandler = (event) => {
        setNewContact(event.target.value)
    }
    
    const addContact = () => {
        // *********************************continue here!!!***********************
        console.log(contacts)
        props.updateContacts({userName: newContact, displayName: props.allUsers.find(x=>x.userName === newContact).displayName, chat:[]})
          setContacts([...contacts])

    }

    return (
        <div>
            {/* <Popup user={user} trigger={buttonPopup} setTrigger={onPopupChange} contact={userContact} chat={userContact.chat} setChat={setUserContactChat} updateContactChat={props.updateContactChat}>
                <h2>my popup</h2>
            </Popup> */}
            <div className='coantainer-fluid HomePage'>
                <div className="row">
                    <div className="col-4 icon">
                        <div>
                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-circle myName" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg>
                            </span>
                            <span className="myName">{user.userName}</span>
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
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <input className="form-control" type="text" onChange={contactChangeHandler}/>
                                        </div>
                                        <div>
                                            {contactExistError}
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            {!isContactExist && <button type="button" className="btn btn-primary" >Add</button>}
                                            {isContactExist && <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={addContact}>Add</button>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ul className="list-group">
                            {contacts && contacts.map(contact =>
                                <button className="list-group-item list-group-item-action primary" key={contact.userName} onClick={() => clickHandler(contact)}>
                                    <li className="list-group-item primary">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                            </svg>
                                        </span>
                                        <span className='item'>{contact.displayName}</span>
                                        {contact.chat.length !== 0 && <h6><span className="new-msg" >{contact.displayName}: "{contact.chat[contact.chat.length - 1].content}"</span><span className="badge bg-secondary">New</span></h6>
}
                                        {/* <h6><span className="new-msg" >{contact.displayName}: "{(!contact.chat === []) && contact.chat[contact.chat.length - 1].content}"</span><span className="badge bg-secondary">New</span></h6> */}
                                    </li>
                                </button>)}
                        </ul>
                    </div>
                    <div className="col-8 icon">
                        <div className="username">
                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-circle myName" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg>
                            </span>
                            <span className="myName">{user.userName}</span>
                        </div>
                        <ChatBox chat={userContact.chat} setChat={setUserContactChat} user={user} contact={userContact} updateContactChat={props.updateContactChat} onUserContactChange={setUserContact}  onPopupChange={onPopupChange}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;