import './App.css';
import LogIn from './LogIn/LogIn';
import SignUp from './SignUp/SignUp';
import HomePage from './HomePage/HomePage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useCallback, useState } from 'react';
import { Redirect } from 'react-router-dom';



function App() {

  var chats = [
    {
    id: 0,
    content: "Hello",
    time: "Today, 10:05 AM",
    sentByMe: true,
    img: false
  },
  {
    id: 1,
    content: "Hi",
    time: "Today, 10:07 AM",
    sentByMe: false,
    img: false

  },
  {
    id: 2,
    content: "How are you?",
    time: "Today, 10:08 AM",
    sentByMe: true,
    img: false
  },
  {
    id: 3,
    content: "Bad, you?",
    time: "Today, 10:08 AM",
    sentByMe: false,
    img: false
  }
];

  const [contacts, setContacts] = useState([
    {
      userName: "OrAlmog",
      displayName: "Or",
      chat: [
        {
          id: 0,
          content: "Hello1",
          time: "Today, 10:05 AM",
          sentByMe: true,
          img: false
        },
        {
          id: 1,
          content: "Hi",
          time: "Today, 10:07 AM",
          sentByMe: false,
          img: false
        },
        {
          id: 2,
          content: "How are you?",
          time: "Today, 10:08 AM",
          sentByMe: true,
          img: false
        },
        {
          id: 3,
          content: "Bad, you?",
          time: "Today, 10:08 AM",
          sentByMe: false,
          img: false
        }]
    },
    {
      userName: "Tony Stark",
      displayName: "Iron man",
      chat: [
        {
          id: 0,
          content: "Hello2",
          time: "Today, 10:05 AM",
          sentByMe: true,
          img: false
        },
        {
          id: 1,
          content: "Hi",
          time: "Today, 10:07 AM",
          sentByMe: false,
          img: false
        },
        {
          id: 2,
          content: "How are you?",
          time: "Today, 10:08 AM",
          sentByMe: true,
          img: false
        },
        {
          id: 3,
          content: "Bad, you?",
          time: "Today, 10:08 AM",
          sentByMe: false,
          img: false
        }
      ]
    },
    {
      userName: "Hemi",
      displayName: "Hemi",
      chat: [
        {
          id: 0,
          content: "Hello3",
          time: "Today, 10:05 AM",
          sentByMe: true,
          img: false
        },
        {
          id: 1,
          content: "Hi",
          time: "Today, 10:07 AM",
          sentByMe: false,
          img: false
        },
        {
          id: 2,
          content: "How are you?",
          time: "Today, 10:08 AM",
          sentByMe: true,
          img: false
        },
        {
          id: 3,
          content: "Bad, you?",
          time: "Today, 10:08 AM",
          sentByMe: false,
          img: false
        }
      ]
    },
    {
      userName: "Bruce Banner",
      displayName: "Hulk",
      chat: [
        {
          id: 0,
          content: "Hello4",
          time: "Today, 10:05 AM",
          sentByMe: true,
          img: false
        },
        {
          id: 1,
          content: "Hi",
          time: "Today, 10:07 AM",
          sentByMe: false,
          img: false
        },
        {
          id: 2,
          content: "How are you?",
          time: "Today, 10:08 AM",
          sentByMe: true,
          img: false
        },
        {
          id: 3,
          content: "Bad, you?",
          time: "Today, 10:08 AM",
          sentByMe: false,
          img: false
        }
      ]
    },
  ])
  const [users, setUsers] = useState([
    { userName: "NivGor", displayName: "NivGor", password: "123456", contacts: contacts},
    { userName: "OrAlmog", displayName: "Or", password:"password", contacts: contacts},
    { userName: "Tony Stark", displayName: "Iron man", password:"iamironman", contacts: contacts},
    { userName: "Hemi", displayName: "Hemi", password:"hemi123", contacts: contacts},
    { userName: "Bruce Banner", displayName: "Hulk", password:"hulk123", contacts: contacts},
    { userName: "mojo", displayName: "jojo", password:"123456a", contacts: contacts}
    ]);
    var user = {userName: "NivGor", displayName: "NivGor", password: "123456", contacts: contacts};

    const updateContactChat = useCallback((sender, receiver, msg) => {
      sender = users.find((x) => x.userName == sender)
      receiver = sender.contacts.find((x) => x.userName == receiver)
      var chat = receiver.chat
      chat.push(msg)
      // users[0].contacts[0].chat.push({id: 99,
      //   content: "How are you?",
      //   time: "Today, 10:08 AM",
      //   sentByMe: true})
      // setUsers(JSON.parse(JSON.stringify(users)));
    }, [users, setUsers])

    const updateContacts = useCallback((contact) => {
      var contacts = user.contacts
      contacts.push(contact)
    }, [user.contacts])

  const [loginFlag, setLoginFlag] = useState(false)
  const loginFlagChange = () => {
    setLoginFlag(true)
  }
  const [signUpFlag, setSignUpFlag] = useState(true)
  const signUpFlagChange = (booleanValue) => {
    setSignUpFlag(booleanValue)
  }
 

  return (
  <Router>
    <Switch>
      <Route exact path="/"> 
        {!loginFlag ? <LogIn  users={users} onUsersChange={setUsers} onFlagChange = {loginFlagChange}/> : <Redirect to="/homepage"/>}
        {/* <LogIn users={users} onUsersChange={setUsers} onFlagChange = {loginFlagChange}/> */}
      </Route>
      <Route path="/signup" >
        <SignUp onSignedFlagChange={signUpFlagChange} users={users} onUsersChange={setUsers}/>
      </Route>
      <Route path="/homepage" >
        {loginFlag ? <HomePage user={user} updateContactChat={updateContactChat} allUsers={users} updateContacts={updateContacts} contacts={user.contacts}/> : <Redirect to="/"/>}
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
