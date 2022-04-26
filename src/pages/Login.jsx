import React from 'react';
import {io} from 'socket.io-client';
import Dashboard from './dashboard';

export default class Login extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      username: '',
      user: '',
      password: '',
      islogged: false,
      socket: null,
    }
    this.changeUsername = this.changeUsername.bind(this);
    this.handleUser = this.handleUser.bind(this);
  }

  changeUsername(e){
    this.setState({
      [e.target.name]: e.target.value,
    },()=> {
      console.log(this.state);
    })
  }

  handleUser(e){
    if(e.keyCode === 13 || e.type === 'submit'){
      e.preventDefault();
      this.setState(prev=>({
        user: prev.username,
      }),() => {
        this.state.socket.emit("newUser", this.state.user);
      });
    }
  }

  componentDidMount(){
    console.log('mounted');
    this.setState({
      socket: io("http://localhost:5000"),
    }) 
  }

  render(){
    return (
      <div className="container">
        {this.state.user ? (
          <Dashboard socket={this.state.socket} user={this.state.user}>
            <span className='username'>{this.state.user}</span>
          </Dashboard>
        ) : (
          <form className="login" onSubmit={this.handleUser}>
            <h3>Login</h3>
            <input 
              type="text" 
              placeholder='username' 
              name='username'
              onChange={this.changeUsername}
              onKeyDown={this.handleUser}
              value={this.state.username}
              minLength={3}
              maxLength={20}
              required
            />
            <input type="password" 
              placeholder='password'
              name='password'
              onChange={this.changeUsername}
              autoComplete="true"
              minLength={4}
              maxLength={20}
              required
            />
            <button type="submit">Sign in</button>
          </form>
        )}
      </div>
    );
  }
}