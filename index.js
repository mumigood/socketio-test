const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
 
var id = 0
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

client.on('connect', () => {
  console.log('Redis client connected');
});
client.set('foo', 'bar', redis.print);
io.on('connection', (socket) => {
  console.log('a user connected');
  id = id+1
  console.log(id)
  var nickname = 'user'+ '0'+id
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
  socket.broadcast.emit('chat message','hi');
  socket.on('chat message', (msg) => {
    io.emit('chat message', nickname +"  : "+ msg);
  });
});




server.listen(4000, () => {
  console.log('listening on *:4000');
});