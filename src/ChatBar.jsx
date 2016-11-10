import React from 'react';

class ChatBar extends React.Component {
    constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const keyPress = event.which
    const msg = event.target.value;
    // const msg = event.target.value
      // if the key that is typed is the 'Enter' (also the 13th) key..
      if(keyPress === 13) {
      //then send the updated message
      // console.log(event.target.value)
        this.props.updateMessages(msg)
      }
    }

  onNameChange(event) {
    const keyPress = event.which
    const newName = event.target.value;
    if(keyPress === 13) {
        //invoking the updatename function in the props object
        //this = current object. target = username input. value = value of username input.
        this.props.submitName(newName);
      }
      this.props.updateName(newName);
    }

  render() {
    //JSX will mainly be in render function
    // console.log("Rendering <ChatBar/>");
    return (
      <footer>
        <input
          id="username"
          type="text"
          placeholder="Your Name (Optional)"
          onChange={ this.onNameChange.bind(this) }
          onKeyDown={ this.onNameChange.bind(this) }
        />
        <input
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          onKeyUp={ this.handleSubmit }
          value={this.props.messages.content}
        />
      </footer>
    );

  }
}

export default ChatBar;