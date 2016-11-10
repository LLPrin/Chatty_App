import React from 'react';

class Message extends React.Component {
  render() {
    // log is to see order of component render
    // console.log("Rendering <Message/>");
    return (
      <div id="message">
        <div className="message">
        <span className="username">{this.props.username} </span>
        <span className="content">{this.props.content} </span>
        </div>
        <div className="message system"></div>
      </div>
    );
  }
}

export default Message;