import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import { UserT } from './Components/model/UserT';
import UsersController from './Components/UsersController';
import { Guest} from './Components/model/sharedTypes';

export const UserContext = React.createContext<UserT>(Guest as UserT);


function App() {
  const [currentUser, setCurrentUser] = useState(Guest as UserT);
  useEffect(() => {
    
  },[currentUser]);
const logUser = (user:UserT) => {
  setCurrentUser(user);
} 
    return (
    <div className="App">
      <UserContext.Provider value = {currentUser}>
      <Header currentUser = {currentUser} setCurrentUser={setCurrentUser}/>
      <UsersController currentUser = {currentUser} setCurrentUser = {logUser}/>
      </UserContext.Provider>
    </div>
  );
}

export default App;
