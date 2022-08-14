import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

interface AppProps {
  name:string;
}
interface AppState {
  friends:string[];
  count:number
}

export default class AppClass extends Component<AppProps,AppState> {
  state:AppState = {
    friends: ['Ivan','Risto','peshkata'],
    count:0
  }

  addFriend = (e:MouseEvent) =>{
      this.setState({
        friends:
        [...this.state.friends, `friend - ${this.state.count}`],
      count: this.state.count + 1
    });
  }
  render(){
    return <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>
        HEllo from R {this.props.name}TS Class!
      </h2>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <ul>
          HEllo from R {this.props.name}TS!
          <h3>Friends of {this.props.name}</h3>
        {this.state.friends.map((friend) => (<li key={friend} className="friend">
          {friend}
        </li>))}
        </ul>
        <button onClick={() => this.addFriend}>Add friend</button>
    </header>
  </div>
  };
}
