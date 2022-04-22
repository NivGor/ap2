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
import { useState } from 'react';
import { Redirect } from 'react-router-dom';



function App() {

  var chats = [
    {
    id: 0,
    content: "Hello",
    time: "Today, 10:05 AM",
    sentByMe: true
  },
  {
    id: 1,
    content: "Hi",
    time: "Today, 10:07 AM",
    sentByMe: false
  },
  {
    id: 2,
    content: "How are you?",
    time: "Today, 10:08 AM",
    sentByMe: true
  },
  {
    id: 3,
    content: "Bad, you?",
    time: "Today, 10:08 AM",
    sentByMe: false
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
          sentByMe: true
        },
        {
          id: 1,
          content: "Hi",
          time: "Today, 10:07 AM",
          sentByMe: false
        },
        {
          id: 2,
          content: "How are you?",
          time: "Today, 10:08 AM",
          sentByMe: true
        },
        {
          id: 3,
          content: "Bad, you?",
          time: "Today, 10:08 AM",
          sentByMe: false
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
          sentByMe: true
        },
        {
          id: 1,
          content: "Hi",
          time: "Today, 10:07 AM",
          sentByMe: false
        },
        {
          id: 2,
          content: "How are you?",
          time: "Today, 10:08 AM",
          sentByMe: true
        },
        {
          id: 3,
          content: "Bad, you?",
          time: "Today, 10:08 AM",
          sentByMe: false
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
          sentByMe: true
        },
        {
          id: 1,
          content: "Hi",
          time: "Today, 10:07 AM",
          sentByMe: false
        },
        {
          id: 2,
          content: "How are you?",
          time: "Today, 10:08 AM",
          sentByMe: true
        },
        {
          id: 3,
          content: "Bad, you?",
          time: "Today, 10:08 AM",
          sentByMe: false
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
          sentByMe: true
        },
        {
          id: 1,
          content: "Hi",
          time: "Today, 10:07 AM",
          sentByMe: false
        },
        {
          id: 2,
          content: "How are you?",
          time: "Today, 10:08 AM",
          sentByMe: true
        },
        {
          id: 3,
          content: "Bad, you?",
          time: "Today, 10:08 AM",
          sentByMe: false
        }
      ]
    },
  ])
  const [users, setUsers] = useState([
    { userName: "NivGor", displayName: "NivGor", password: "123456", contacts: contacts},
    { userName: "OrAlmog", displayName: "Or", password:"password", contacts: contacts},
    { userName: "Tony Stark", displayName: "Iron man", password:"iamironman", contacts: contacts},
    { userName: "Hemi", displayName: "Hemi", password:"hemi123", contacts: contacts},
    { userName: "Bruce Banner", displayName: "Hulk", password:"hulk123", contacts: contacts}
    ]);

  const [loginFlag, setLoginFlag] = useState(false)
  const flagChange = () => {
    // console.log("now we log in")
    // console.log(loginFlag);
    setLoginFlag(true)
    // console.log(loginFlag);
  }
  var user = {userName: "NivGor", displayName: "NivGor", password: "123456", contacts: contacts};
  return (
  <Router>
    <Switch>
      <Route exact path="/"> 
        {!loginFlag ? <LogIn onFlagChange = {flagChange} users={users} onUsersChange={setUsers} /> : <Redirect to="/homepage"/>}
      </Route>
      <Route path="/signup" >
        <SignUp users={users} onUsersChange={setUsers}/>
      </Route>
      <Route path="/homepage" >
        {loginFlag ? <HomePage user={user} changeContacts={setContacts} /> : <Redirect to="/"/>}
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
