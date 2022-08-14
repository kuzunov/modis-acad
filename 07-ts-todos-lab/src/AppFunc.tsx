import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface AppProps {
  name:string;
  country:string;
}

const  AppLambda = ({name,country}:AppProps) => {
  const [friends, setFriends] = useState(['Ivan','Risto','peshkata'])
  return ( 
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          HEllo from R {name}TS!
          <h3>Friends of {name} of {country}</h3>
        {friends.map((friend) => (<li key={friend} className="friend">
          {friend}
        </li>))}
        </ul>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default AppLambda;
