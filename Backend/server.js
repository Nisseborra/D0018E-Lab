const mysql = require('mysql2');
const express = require('express');
const http = require('http');
const { connect } = require('http2');
const { disconnect } = require('process');
const socketIO = require('socket.io');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const pool = mysql.createPool({
    host:'localhost',            //process.env.MYSQL_HOST,
    user:'root' ,               //process.env.MYSQL_USER,
    password:'root',              //process.env.MYSQL_PASSWORD,
    database:'D0018E'               ///process.env.MYSQL_DATABASE
}).promise()

//////////////////// DATABASE TABLE GETERS

async function getItem() {
  //console.log("calling");
  const [rows] = await pool.query("SELECT * FROM ITEM");
  console.log(rows);
  
  return rows;
}

async function getItem(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM ITEM
        WHERE ITEM_ID = ${id}
        `);
    console.log(rows);
    
    return rows;
}

getItem(1)



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
  console.log('server starta');
});

