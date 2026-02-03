const express = require('express');
const http = require('http');
const { connect } = require('http2');
const { disconnect } = require('process');
const socketIO = require('socket.io');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
        console.log('connected:', socket.id);

 });



server.listen(3000, () => {
  console.log('server started');
});

