import { useState } from 'react';

const UsersList = () => {

    var [users, setUsers] = useState(
        [
            {
                userName: "NivGor",
                displayName: "NivGor",
                password: "123456"
            },
            {
                userName: "OrAlmog", 
                displayName: "Or", 
                password:"password"
            },
            {
                userName: "Tony Stark", 
                displayName: "Iron man", 
                password:"iamironman"
            }
        ]
    );

    const addUser = (newUser) => {
        setUsers([...users, newUser]);
    }

    return ({ users, addUser })

}

export default UsersList;
         