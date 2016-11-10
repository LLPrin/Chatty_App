import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import uuid from 'node-uuid'

class App extends Component {
  // set the initial state to indicate that that the timer is not loading
  // React will call the functions in the following order when it mounts the component:
  //   constructor
  //   componentWillMount (not used in this component)
  //   render
  //   componentDidMount

  //props = properties
  constructor(props){
    super(props);
     this.state = {
      currentUser: { name: "Guest" },
      messages: [],
      usersOnline: 0

    }
  }
  // Called after the component was rendered and it was attached to the DOM.
  // This is a good place to make ajax requests or setTimeout.
  updateMessages(messagevalue) {
    // console.log(messagevalue)
    const newMessage = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: messagevalue
    }

    this.socket.send(JSON.stringify(newMessage))
  }


  updateName(name){
    // this.setState({currentUser: {name}});
  }

   submitName(name) {

    // console.log(this.state.currentUser.name);
    const oldName = this.state.currentUser.name;
    // console.log('submitting name!!!!!!', name);
    const newName = name;
    // console.log('this.state', this.state);
    this.setState({currentUser: { name }});

    const userId = this.state.currentUser.userId;
    const payload = JSON.stringify({
      type: 'NAME_UPDATE',
      content: oldName + ' has changed their name to ' + name +'.',
      });
    console.log('sent to server: ', payload);

    this.socket.send(payload);

  }

  // Called any time the props or state changes. The jsx elements returned in this
  // method are rendered in the DOM.

  componentDidMount() {
    // console.log("componentDidMount <App />")
    this.socket = new WebSocket ('ws://localhost:4000/')
    this.socket.onopen = (event) => {
      console.log("Connected to Server.");
    }
    this.socket.onmessage = (event) => {
      console.log("event", event)
      var message = JSON.parse(event.data);
      console.log("message", message)
      console.log(message.userCount)
      var newCount = message.userCount
      this.setState({ usersOnline: newCount})
      this.setState({ messages: this.state.messages.concat(message)})
    }
  }



  render() {
    return (
      <div>
        <nav>
          <h1>Chatty</h1>
          <h2> {this.state.usersOnline} Users Online</h2>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar userName={this.state.currentUser.name}
          updateName={ this.updateName.bind(this) }
          submitName={this.submitName.bind(this)}
          updateMessages={this.updateMessages.bind(this)}
          messages={this.state.messages}
        />
      </div>
    );
  }
}
export default App;
