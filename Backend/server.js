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
    password:'Root1234',              //process.env.MYSQL_PASSWORD,
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
        SELECT * FROM ITEM WHERE ITEM_ID = ${id}`);
    console.log(rows);
    
    return rows;
}

getItem(1)



async function Loggin(username, password, socket) {
    const [rows]  = await pool.query(`
        SELECT * 
        FROM USERS
        WHERE USERNAME =?`, [username]);
        const user = rows[0];
        if(user === undefined){
            socket.emit("loggin_error", "wrong username or passoword")
            return
        }
        if(user.USERNAME === username){
            console.log("username check:", user.USERNAME === username);
            if(user.PASSWORD === password){
                console.log("password check", user.PASSWORD === user.PASSWORD)
                console.log("loggin success",)
                socket.emit("logging_success", user.USERNAME)
                return
            }
        }
        socket.emit("loggin_error", "wrong username or passoword") 
   
    
}

async function signup(fname, lname, username, password, socket) {
        const [rows]  = await pool.query(`
        SELECT * 
        FROM USERS
        WHERE USERNAME =?`, [username]);
        const user = rows[0]
        if(user !== undefined){
            socket.emit("signup_error", "Username or account already exist")
            return
        }

        await pool.query(`
        INSERT INTO USERS (USERNAME, FNAME, LNAME, PASSWORD)
         VALUES (?,? ,?, ?)`, [username, fname, lname,password]
        );

        //check
       const [new_user]  = await pool.query(`
        SELECT * 
        FROM USERS
        WHERE USERNAME =?`, [username]);
        console.log("new_user_success", new_user[0])
        socket.emit("signup_success", "succeful sign up")

}



const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});




io.on('connection', (socket) => {
        console.log('connected:', socket.id);




    socket.on("loggin", ({username, Password})=>{
        Loggin(username,Password, socket);
            } );


    socket.on("signup",({fname, lname, username, password})=>{
        console.log("fname", fname)
        console.log("lname", lname)
        console.log("username", username)
        console.log("password", password)
                 
    
        signup(fname, lname, username, password, socket);
    })

 });



server.listen(3000, () => {
  console.log('server starta');
});

