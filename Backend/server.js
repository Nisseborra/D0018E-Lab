//import mysql from 'mysql2'
const express = require('express');
const http = require('http');
const { connect } = require('http2');
const { disconnect } = require('process');
const socketIO = require('socket.io');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

/*const pool = mysql.createpool({
    host: '',
    user: 'root',
    password: '',
    database: 'D0018E'
}).promise()

const result = await pool.query();
*/

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

const test = ['nils','123']

io.on('connection', (socket) => {
        console.log('connected:', socket.id);

    socket.on("loggin", ({username, Password})=>{
        console.log("loggin in server")
            console.log("test user", test[0] == username)
            console.log("test password",test[1])
        if(test[0] === username && test[1] === Password){
            socket.emit("logging_success", username)
            return
        }
        socket.emit("loggin_error", "loggin error")
    });

 });



server.listen(3000, () => {
  console.log('server started');
});

