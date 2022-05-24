import { useCallback, useState, useEffect } from 'react';
import './HomePage.css';
import '../InputBar';
import InputBar from '../InputBar';
import ChatBox from '../ChatBox';
import { render } from '@testing-library/react';
import axios from 'axios';

function HomePage(props) {
    var user = props.user
    const [contacts, setContacts] = useState()
    const [contactName, setSContactName] = useState("")
    const [contactNick, setContactNick] = useState("")
    const [contactServer, setContactServer] = useState("")
    const [userContact, setUserContact] = useState("")
    const [buttonPopup, setButtonPopup] = useState(false)
    const [newContact, setNewContact] = useState("")
    // const [isContactValid, setIsContactValid] = useState(false)
    const [isContactValid, setIsContactValid] = useState(true)
    const [contactValidError, setContactValidError] = useState("")

    const clickHandler = (contact) => {
        setUserContact(contact)
        var input = document.getElementById('msgInput')
        if (input != null) {
        input.value = ''
        }
    }
    async function getContacts(){
        axios.get('http://localhost:5026/api/' + props.user.username + '/Contacts').then(res => {
        setContacts(res.data)
        })
    }

    useEffect(() => {
        getContacts()
    },[]);

    const setUserContactChat = useCallback((chat) => {
        setUserContact({ ...userContact, chat })
    }, [userContact, setUserContact])

    const onPopupChange = () => {
        setButtonPopup(!buttonPopup)
    }

    async function addContactToServer(contact) {
        var response = await axios.post('http://' + contactServer + '/api/Invitations',
                        {From:  props.user.username, To: contactName, Server: "localhost:5026" },
                        {withCredentials: true})
        if (response.status == 200) {
            await axios.post('http://localhost:5026/api/' + props.user.username + '/Contacts',
                        contact,
                        {withCredentials: true})
            setContacts([...contacts, contact])
            props.updateContacts(contact)
            getContacts()
        }    
    }
    // useEffect(() => {
    //     var users = props.allUsers
    //     let isExist = users.find(x => x.username === newContact)
    //     let isContactAlready = contacts.find(x => x.username === newContact) != null
    //     let isMyself = newContact === user.username
    //     if (isExist && !isContactAlready && !isMyself) {
    //         setContactValidError("")
    //         setIsContactValid(true)
    //     }
    //     else {
    //         setIsContactValid(false)
    //         if (!isExist) {
    //             setContactValidError("This username doesn't exist")
    //         }
    //         if (isContactAlready) {
    //             setContactValidError("This user is already a contact")
    //         }
    //         if (isMyself) {
    //             setContactValidError("You can't add yourself")
    //         }
    //     }
    // }, [newContact])

    const contactNameChangeHandler = (event) => {
        setSContactName(event.target.value)
    }
    const contactNickChangeHandler = (event) => {
        setContactNick(event.target.value)
    }
    const contactServerChangeHandler = (event) => {
        setContactServer(event.target.value)
    }

    // const addContact = () => {
    //     props.updateContacts({ })
    //     setcontacts([...contacts])
    //     addContactToServer()
    //     clearInput()
    //     setContactValidError("")
    // }

    useEffect(() => {
        
    }, [userContact.messages])

    const addContact = () => {
        var contact = {Id:  contactName, Name: contactNick, Server: contactServer, Last: '', LastDate: '', messages: [] }
        addContactToServer(contact)
        clearInput()
        setContactValidError("")
    }

        
    const clearInput = () => {
        let input = document.getElementById('add-contact')
        input.value = ''
    }

    // useEffect(()=>{
    //     setContacts(props.contacts)
    // },[props.contacts, contacts])


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
                                            <input className="form-control" placeholder="Type in contact's username" id="add-contact" type="text" onChange={contactNameChangeHandler} />
                                        </div>
                                        <div className="modal-body">
                                            <input className="form-control" placeholder="Type in contact's nick name" id="add-contact" type="text" onChange={contactNickChangeHandler} />
                                        </div>
                                        <div className="modal-body">
                                            <input className="form-control" placeholder="Type in contact's server" id="add-contact" type="text" onChange={contactServerChangeHandler} />
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
                            {userContact == "" ? "" : <img src={userContact.img} className="img-fluid rounded-start me profile-pic" alt="avatar" />}
                        </div>
                        <div className="col-11">
                            <div className="card-title">
                                <h3 className='user-name'>{ userContact == "" ? "" : userContact.displayName}</h3>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main">
                <div className="side-menu">
                    {contacts && contacts.map(contact =>
                        <div className="card mb-3 contact" tabIndex="1" onClick={() => clickHandler(contact)}>
                            <div className="row g-0">
                                <div className="col-2">
                                    <img src={contact.img} className="img-fluid rounded-start profile-pic" alt="avatar" />
                                </div>
                                <div className="col-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{contact.name}</h5>
                                        {contact.messages.length !== 0 &&
                                        <p className="card-text msg-preview">{contact.messages[contact.messages.length - 1].sent ? 'You' : contact.Name}: "{contact.messages[contact.messages.length - 1].content}".</p>}
                                    </div>
                                </div>
                                <div className="col-2">
                                {contact.messages.length !== 0 && <small className="text-muted">{contact.messages[contact.messages.length - 1].Created}</small> }
                                </div>
                            </div>
                        </div>)}
                </div>
                <div className="content">
                    <ChatBox chat={userContact == "" ? "" : userContact.messages} setChat={setUserContactChat} user={user} contact={userContact} updateContactChat={props.updateContactChat} onUserContactChange={setUserContact} onPopupChange={onPopupChange} />
                    {/* <ChatBox chat={userContact == "" ? "" : userContact.messages} user={user} contact={userContact} /> */}
                </div>
            </div>
        </div>
    );
}

export default HomePage;