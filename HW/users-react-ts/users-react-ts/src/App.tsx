import React, { Dispatch, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import { UserT } from './Components/model/UserT';
import RegisterForm from './Components/RegisterForm';
import User from './Components/User';
import UsersController from './Components/UsersController';
import { Guest, UserListener, USER_GENDER } from './sharedTypes';

type userStateT = {
  user:UserT,
  setCurrentUser:Dispatch<React.SetStateAction<UserT>>,
}

export const UserContext = React.createContext<userStateT>({} as userStateT);


function App() {
  const [user, setCurrentUser] = useState(Guest as UserT);

    return (
    <div className="App">
      <UserContext.Provider value = {{user,setCurrentUser}}>
      <Header />
      <UsersController />
      </UserContext.Provider>
    </div>
  );
}

export default App;
