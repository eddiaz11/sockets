const WebSocket = require("ws");
const Message =  require("./models/message");


const clients = [];
const messages = [];

const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();

    ws.on("message", (message) => {
      messages.push(message);
      sendMessages();
      persist(message);
      
    });
  });

  const sendMessages = () => {
    clients.forEach((client) => client.send(JSON.stringify(messages)));
  };
  const persist =(ms) =>{
    Message.create({ message: ms, user: "navegador", ts: Date.now() }).then(
      (result) => {
        update();
      }
    );
  }
  const update = () =>{
    Message.findAll().then((result) => {
     messages=result;
    });
  }
};

exports.wsConnection = wsConnection;