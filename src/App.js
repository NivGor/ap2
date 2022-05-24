// import './App.css';
// import LogIn from './LogIn/LogIn';
// import SignUp from './SignUp/SignUp';
// import HomePage from './HomePage/HomePage';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
// import { useCallback, useEffect, useState } from 'react';
// import { Redirect } from 'react-router-dom';



// // function App() {
// //   const [users, setUsers] = useState([]);
// //   useEffect(() => {
// //     async function fetchData(){
// //     const res = await fetch('http://localhost:5026/api/Users');
// //     const data = await res.json();
// //     setUsers(data);
// //     }
// //     fetchData();
// //   },[users]);
//   function App() {
//     const [users, setUsers] = useState([]);
//     useEffect(() => {
//       async function fetchData(){
//       const res = await fetch('http://localhost:5026/api/Users');
//       const data = await res.json();
//       setUsers(data);
//       }
//       fetchData();
//     },[]);
//   const [loggedInUser, setLoggedInUser] = useState({ username: "NivGor", DisplayName: "NivGor", password: "123456", contacts: {messages: {}} }
//   )
//   const logInUser = (username) => {
//     setLoggedInUser(users.find(x=> x.username === username))
//   }
//   const updateContactChat = useCallback((sender, receiver, msg) => {
//     sender = users.find((x) => x.username == sender)
//     receiver = sender.contacts.find((x) => x.username == receiver)
//     var chat = receiver.messages
//     chat.push(msg)
//     // users[0].contacts[0].chat.push({id: 99,
//     //   content: "How are you?",
//     //   time: "10:08, 26.4.22",
//     //   sentByMe: true})
//     // setUsers(JSON.parse(JSON.stringify(users)));
//   }, [users, setUsers])

//   const updateContacts = useCallback((contact) => {
//     var contacts = loggedInUser.contacts
//     contacts.push(contact)
//   }, [loggedInUser.contacts])

//   const [loginFlag, setLoginFlag] = useState(false)
//   const loginFlagChange = () => {
//     setLoginFlag(true)
//   }
//   const [signUpFlag, setSignUpFlag] = useState(true)
//   const signUpFlagChange = (booleanValue) => {
//     setSignUpFlag(booleanValue)
//   }


//   return (
//     <Router>
//       <Switch>
//         <Route exact path="/">
//           {!loginFlag ? <LogIn users={users} onUsersChange={setUsers} onFlagChange={loginFlagChange} logInUser={logInUser}/> : <Redirect to="/homepage" />}
//           {/* <LogIn users={users} onUsersChange={setUsers} onFlagChange = {loginFlagChange}/> */}
//         </Route>
//         <Route path="/signup" >
//           <SignUp onSignedFlagChange={signUpFlagChange} users={users} onUsersChange={setUsers}/>
//         </Route>
//         <Route path="/homepage" >
//           {loginFlag ? <HomePage user={loggedInUser} updateContactChat={updateContactChat} allUsers={users} updateContacts={updateContacts} contacts={loggedInUser.contacts} /> : <Redirect to="/" />}
//         </Route>
//       </Switch>
//     </Router>
//   );
// }

// export default App;
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
import { useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';



// function App() {
//   const [users, setUsers] = useState([]);
//   useEffect(() => {
//     async function fetchData(){
//     const res = await fetch('http://localhost:5026/api/Users');
//     const data = await res.json();
//     setUsers(data);
//     }
//     fetchData();
//   },[users]);
  function App() {
    const [users, setUsers] = useState([]);
    // useEffect(() => {
    //   async function fetchData(){
    //   const res = await fetch('http://localhost:5026/api/Users');
    //   const data = await res.json();
    //   setUsers(data);
    //   }
    //   fetchData();
    // },[]);
  const [loggedInUser, setLoggedInUser] = useState({ username: "NivGor", DisplayName: "NivGor", password: "123456", contacts: [{messages:[]}] }
  )
  // const logInUser = (username) => {
  //   setLoggedInUser(users.find(x=> x.username === username))
  // }
  const logInUser = (user) => {
    setLoggedInUser(user)
  }
  const updateContactChat = useCallback((sender, receiver, msg) => {
    sender = loggedInUser
    receiver = loggedInUser.contacts.find((x) => x.username == receiver)
    var chat = receiver.messages
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
          <SignUp onSignedFlagChange={signUpFlagChange} users={users} onUsersChange={setUsers}/>
        </Route>
        <Route path="/homepage" >
          {loginFlag ? <HomePage user={loggedInUser} updateContactChat={updateContactChat} allUsers={users} updateContacts={updateContacts} contacts={loggedInUser.contacts} /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;





