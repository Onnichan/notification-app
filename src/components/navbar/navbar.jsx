import React from 'react';
import Notification from '../../img/info.svg';
import Setting from '../../img/settings.svg';
import Message from '../../img/message.svg';
import './navbar.css';

export default class Navbar extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      notifications:[],
      open: false,
    }
    this.handleRead = this.handleRead.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  componentDidMount(){
    this.props.socket.on("getNotification", data => {
      this.setState(prev=>({
        notifications: [...prev.notifications, data],
      }))
    })
  }

  displayNotification({senderName, type}, index){
    let action;

    if(type === '1'){
      action = "liked";
    }else if(type === '2'){
      action = "commented";
    }else{
      action = "shared";
    }

    return <span className='notification' key={index}>{`${senderName} ${action} your post.`}</span>
  }

  handleRead(){
    this.setState({
      notifications: [],
      open: false,
    });
  }

  handleOpen(){
    this.setState(prev => ({
      open:!prev.open
    }));
  }

  render(){
    return (
      <div className="navbar">
        <span className='logo'>Notification App</span>
        <div className="icons">
          <div className="icon" onClick={this.handleOpen}>
            <img src={Notification} className="iconImg" alt="" />
            {
              this.state.notifications.length > 0 &&
              <div className="counter">{this.state.notifications.length}</div>
            }
          </div>
          <div className="icon" onClick={this.handleOpen}>
            <img src={Message} className="iconImg" alt="" />
          </div> 
          <div className="icon" onClick={this.handleOpen}>
            <img src={Setting} className="iconImg" alt="" />
          </div>
          {
            this.state.open && (
              <div className="notifications">
                {this.state.notifications.map((n, index) => this.displayNotification(n, index))}
                <button className="nButton">
                  Mark as read
                </button>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}