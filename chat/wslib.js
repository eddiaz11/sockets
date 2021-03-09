const WebSocket = require("ws");
const back = require("./models/message");

const clients = [];
const messages = [];

const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();

    ws.on("message", (message) => {
      messages.push(message);
      console.log(message);
      sendMessages();
      persist();
      update();
    });
  });

  const sendMessages = () => {
    clients.forEach((client) => client.send(JSON.stringify(messages)));
  };
  const persist =() =>{


  }
  const update = () =>{

  }
};

exports.wsConnection = wsConnection;