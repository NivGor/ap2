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

  const [contacts, setContacts] = useState([
    {
      userName: "OrAlmog",
      displayName: "Or",
      chat: [
        {
          id: 0,
          content: "Hello1",
          time: "10:05, 26.4.22",
          sentByMe: true,
          type: "text"
        },
        {
          id: 1,
          content: "Hi",
          time: "10:07, 26.4.22",
          sentByMe: false,
          type: "text"
        },
        {
          id: 2,
          content: "How are you?",
          time: "10:08, 26.4.22",
          sentByMe: true,
          type: "text"
        },
        {
          id: 3,
          content: "Amazing, you?",
          time: "10:08, 26.4.22",
          sentByMe: false,
          type: "text"
        }],
        img: "https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg"
    },
    {
      userName: "Tony Stark",
      displayName: "Iron man",
      chat: [
        {
          id: 0,
          content: "Hello2",
          time: "10:05, 26.4.22",
          sentByMe: true,
          type: "text"
        },
        {
          id: 1,
          content: "Hi",
          time: "10:07, 26.4.22",
          sentByMe: false,
          type: "text"
        },
        {
          id: 2,
          content: "How are you?",
          time: "10:08, 26.4.22",
          sentByMe: true,
          type: "text"
        },
        {
          id: 3,
          content: "A Video",
          time: "10:08, 26.4.22",
          sentByMe: false,
          type: "video",
          source: "erez.mp4"
        }
      ],
      img: "https://ae05.alicdn.com/kf/Hf763d459ba5f4c1c956acb0b5c3c9d3cA/IVSTA-Tony-Stark-Computer-Glasses-Frame-Men-anti-Blue-Light-Blocking-Rays-Gaming-Steampunk-Goggles-Iron.jpg"
    },
    {
      userName: "Hemi",
      displayName: "Hemi",
      chat: [
        {
          id: 0,
          content: "Hello3",
          time: "10:05, 26.4.22",
          sentByMe: true,
          type: "text"
        },
        {
          id: 1,
          content: "Hi",
          time: "10:07, 26.4.22",
          sentByMe: false,
          type: "text"
        },
        {
          id: 2,
          content: "How are you?",
          time: "10:08, 26.4.22",
          sentByMe: true,
          type: "text"
        },
        {
          id: 3,
          content: "An image",
          time: "10:08, 26.4.22",
          sentByMe: false,
          type: "img",
          source: "bana.jpeg"
        }
      ],
      img: "https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg"
    },
    {
      userName: "Bruce Banner",
      displayName: "Hulk",
      chat: [
        {
          id: 0,
          content: "Hello4",
          time: "10:05, 26.4.22",
          sentByMe: true,
          type: "text"
        },
        {
          id: 1,
          content: "Hi",
          time: "10:07, 26.4.22",
          sentByMe: false,
          type: "text"
        },
        {
          id: 2,
          content: "How are you?",
          time: "10:08, 26.4.22",
          sentByMe: true,
          type: "text"
        },
        {
          id: 3,
          content: "A Voice Message",
          time: "10:08, 26.4.22",
          sentByMe: false,
          type: "audio",
          source: "dekel vaknin.mp3"
        }
      ],
      img: "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Bruce-Banner.The-Incredible-Hulk.webp"
    },
    {
      userName: "Eli",
      displayName: "Eli",
      chat: [
        {
          id: 0,
          content: "Hello5",
          time: "10:05, 26.4.22",
          sentByMe: true,
          type: "text"
        },
        {
          id: 1,
          content: "Hi",
          time: "10:07, 26.4.22",
          sentByMe: false,
          type: "text"
        },
        {
          id: 2,
          content: "How are you?",
          time: "10:08, 26.4.22",
          sentByMe: true,
          type: "text"
        },
        {
          id: 3,
          content: "Amazing, you?",
          time: "10:08, 26.4.22",
          sentByMe: false,
          type: "text"
        }],
        img: "https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg"
    },
    {
      userName: "mojo",
      displayName: "jojo",
      chat: [
        {
          id: 0,
          content: "Hello6",
          time: "10:05, 26.4.22",
          sentByMe: true,
          type: "text"
        },
        {
          id: 1,
          content: "Hi",
          time: "10:07, 26.4.22",
          sentByMe: false,
          type: "text"
        },
        {
          id: 2,
          content: "How are you?",
          time: "10:08, 26.4.22",
          sentByMe: true,
          type: "text"
        },
        {
          id: 3,
          content: "Amazing, you?",
          time: "10:08, 26.4.22",
          sentByMe: false,
          type: "text"
        }],
        img: "https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg"
    }
  ])
  const [users, setUsers] = useState([
    { userName: "NivGor", displayName: "NivGor", password: "123456", contacts: contacts.filter((x)=>x.userName !== "NivGor"), img: "https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg"},
    { userName: "OrAlmog", displayName: "Or", password: "password", contacts: contacts.filter((x)=>x.userName !== "OrAlmog"), img: "https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg" },
    { userName: "Tony Stark", displayName: "Iron man", password: "iamironman", contacts: contacts.filter((x)=>x.userName !== "Tony Stark"), img: "https://ae05.alicdn.com/kf/Hf763d459ba5f4c1c956acb0b5c3c9d3cA/IVSTA-Tony-Stark-Computer-Glasses-Frame-Men-anti-Blue-Light-Blocking-Rays-Gaming-Steampunk-Goggles-Iron.jpg" },
    { userName: "Hemi", displayName: "Hemi", password: "hemi123", contacts: contacts.filter((x)=>x.userName !== "Hemi"), img: "https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg"},
    { userName: "Bruce Banner", displayName: "Hulk", password: "hulk123", contacts: contacts.filter((x)=>x.userName !== "Bruce Banner"), img: "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Bruce-Banner.The-Incredible-Hulk.webp" },
    { userName: "mojo", displayName: "jojo", password: "123456a", contacts: contacts.filter((x)=>x.userName !== "mojo"), img: "https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg" },
    { userName: "Eli", displayName: "Eli", password: "123456a", contacts: contacts.filter((x)=>x.userName !== "Eli"), img: "https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg" }
  ]);
  var user = { userName: "NivGor", displayName: "NivGor", password: "123456", contacts: contacts };
  const [loggedInUser, setLoggedInUser] = useState({ userName: "NivGor", displayName: "NivGor", password: "123456", contacts: contacts })
  const logInUser = (userName) => {
    setLoggedInUser(users.find(x=> x.userName === userName))
  }
  const updateContactChat = useCallback((sender, receiver, msg) => {
    sender = users.find((x) => x.userName == sender)
    receiver = sender.contacts.find((x) => x.userName == receiver)
    var chat = receiver.chat
    chat.push(msg)
    // users[0].contacts[0].chat.push({id: 99,
    //   content: "How are you?",
    //   time: "10:08, 26.4.22",
    //   sentByMe: true})
    // setUsers(JSON.parse(JSON.stringify(users)));
  }, [users, setUsers])

  const updateContacts = useCallback((contact) => {
    var contacts = loggedInUser.contacts
    contacts.push(contact)
  }, [loggedInUser.contacts])

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
          {!loginFlag ? <LogIn users={users} onUsersChange={setUsers} onFlagChange={loginFlagChange} logInUser={logInUser}/> : <Redirect to="/homepage" />}
          {/* <LogIn users={users} onUsersChange={setUsers} onFlagChange = {loginFlagChange}/> */}
        </Route>
        <Route path="/signup" >
          <SignUp onSignedFlagChange={signUpFlagChange} users={users} onUsersChange={setUsers} contacts={contacts}/>
        </Route>
        <Route path="/homepage" >
          {loginFlag ? <HomePage user={loggedInUser} updateContactChat={updateContactChat} allUsers={users} updateContacts={updateContacts} contacts={loggedInUser.contacts} /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
