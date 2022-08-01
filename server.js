const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const pubClient = createClient({ url: "redis://localhost:6379" });
const subClient = pubClient.duplicate()

const client = createClient({ host: '127.0.0.1', port: 6379 });
const io = new Server(httpServer, {   
    cors: {
        origin: "http://localhost:8000"
  }});

async function testCache() {
  await client.connect();
  var mg = await client.subscribe('mumi').message
  console.log(mg)
  return mg
}

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  io.adapter(createAdapter(pubClient, subClient,key='mumi'));
});

client.connect();
client.subscribe('mumi',message => {
  console.log(message)
  io.emit('chat message', "tukey" +"  : "+ message);
});
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  console.log(token);
  if (token == "mumi"){
    next()
  }
  else{
  const err = new Error("sorry, you are not authorized");
  err.data = { content: "Please retry later" }; // additional details
  next(err);
  }
});

io.on("connection", (socket) => {
    console.log("a user is connected")
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
    io.emit('chat message','Hi, welcome to tukey message.');

    socket.on('chat message', (msg) => {
      io.emit('chat message', "user" +"  : "+ msg);
    });
});


io.listen(4000, () => {
    console.log('listening on *:4000');
  });

