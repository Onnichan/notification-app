import React from 'react';
import Info from '../../img/info.svg';
import HeartFilled from '../../img/heartFilled.svg';
import Comment from '../../img/comment.svg';
import Share from '../../img/share.svg';
import Heart from '../../img/heart.svg';
import './card.css';

export default class Card extends React.Component{
  
  constructor(props){
    super(props)
    this.state = {
      liked: false,
    }
    this.handleNotification = this.handleNotification.bind(this);
  }

  handleNotification(event){
    
    if(event.target.dataset.type === '1'){
      this.setState(prev=> ({
        liked: !prev.liked,
      }));
    }

    this.props.socket.emit("sendNotification", {
      senderName: this.props.user,
      receiverName: this.props.post.username,
      type: event.target.dataset.type
    })
  }

  componentWillUnmount(){
    console.log('unmounting');
  }

  render(){
    const {post} = this.props;
    return (
      <div className="card">
        <div className="info">
          <img src={post.userImg} alt="" className="userImg" />
          <span>{post.fullname}</span>
        </div>
        <img src={post.postImg} alt="" className="postImg" />
        <div className="interaction">
          {
            this.state.liked ? (
              <img src={HeartFilled} alt="" className="cardIcon" data-type={1} onClick={this.handleNotification}/>
            ) : (
              <img src={Heart} alt="" className="cardIcon" data-type={2} onClick={this.handleNotification}/>
            )
          }
          <img src={Comment} alt="" className="cardIcon" data-type={3} onClick={this.handleNotification}/>
          <img src={Share} alt="" className="cardIcon " data-type={4} onClick={this.handleNotification}/>
          <img src={Info} alt="" className="cardIcon infoIcon" />
        </div>
      </div>
    )
  }
}