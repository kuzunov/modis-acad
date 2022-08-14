import React from 'react';
import logo from './logo.svg';
import './App.css';

interface AppProps {
  name:string;
}

export default function App({name}: AppProps):JSX.Element {
  return ( 
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>
          HEllo from R {name}TS!
        </h2>
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
