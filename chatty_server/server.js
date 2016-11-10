// Chatty Server > server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

const connectedUserList = [];

// Set uuid to variable


// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    const msg = JSON.parse(message);
    console.log('received: ', msg);
    const { type, content, user1 } = msg;

    if (type === 'NAME_UPDATE') {
      console.log('lets update name to', content);
      const postNotification = { type: 'incomingNotification'}
      postNotification.id = uuid.v1()
      postNotification.content = content

      wss.broadcast(JSON.stringify(postNotification));
    }

    if (type === 'NEW_USER') {
      console.log("A new user just connected. Here is the user info", msg.currentUser);
      const { currentUser } = msg;
      // connectedUserList.push(currentUser);
      console.log('here is my usersList on server', currentUser);
    }

    if (type === 'postMessage') {
      var receivedMessage = JSON.parse(message);
      // console.log(receivedMessage)
      var outgoingMessage = {type: 'incomingMessage'}
      outgoingMessage.id = uuid.v1()
      outgoingMessage.username = receivedMessage.username
      outgoingMessage.content = receivedMessage.content

      wss.broadcast(JSON.stringify(outgoingMessage));
    }
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});