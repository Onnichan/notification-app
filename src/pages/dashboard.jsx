import React from 'react';
import {posts} from '../data';
import Navbar from '../components/navbar/navbar';
import Card from '../components/card/card';

export default class Dashboard extends React.Component{
  
  render(){
    const {socket, user} = this.props;
    return (
      <>
        <Navbar socket={socket}/>
        {
          posts.map(post => {
            return <Card key={post.id} post={post} socket={socket} user={user}/>
          })  
        }
      </>
    )
  }
}