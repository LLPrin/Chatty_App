import React from 'react';
// REMEMBER TO PUT THE FILE TYPE IN!!!!
import Message from './Message.jsx';

class MessageList extends React.Component {

  getMessages(prop) {
    this.prop.messages.map((message) =>{
    })
  }
  render() {
    // console.log("Rendering <MessageList /> ");
    return (
      <div id="message-list">
        {this.props.messages.map((message) => {
          return <Message
            key={message.id}
            username={message.username}
            content={message.content}
            />
        })}
      </div>
    )
  }
}

export default MessageList;