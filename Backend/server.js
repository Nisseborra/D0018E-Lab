const mysql = require('mysql2');
const express = require('express');
const http = require('http');
const { connect } = require('http2');
const { disconnect } = require('process');
const socketIO = require('socket.io');
const { Server } = require('socket.io');
const { socket } = require('../Frontend/assets/socket');
const { log } = require('console');

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

async function getCategory() {
    const[rows] = await pool.query(`
        SELECT *
        FROM CATEGORY

    `)
    
    console.log(rows.length);
    
    return rows;
}





async function item(title,image_1,image_2,image_3,description,price,id,socket) {
    //check the current username of the the sellers username 
     const[rows] = await pool.query(`
        SELECT *
        FROM USERS
        WHERE USER_ID = ${id}

    `)

    //TEMPORARY
    const[CATEGORY] = await pool.query(`
        SELECT *
        FROM CATEGORY
        WHERE CATEGORY_ID  = ${1}

    `)
    const username = rows[0].USERNAME;
    const category = CATEGORY[0].CATEGORY_ID
    console.log(category);
    
    const ImageCheck = (img) =>{
        if (img == "") {
            return null
        }
        return img
    }    
    
    await pool.query(`
        INSERT INTO ITEM (USER_ID, TITLE, PRICE, DESCRIPTION,IMAGE_1,IMAGE_2,IMAGE_3,CATEGORY_ID,CREATED_BY)
        VALUES (?, ?, ?, ?, ?, ?, ?,?,?)`,
        [id, title, price, description, ImageCheck(image_1), ImageCheck(image_2), ImageCheck(image_3),category,username]
        );


    socket.emit("item_uploaded", "item is uploaded")

    
}



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
            console.log("username check:",  username);
            if(user.PASSWORD === password){
                console.log("password check",  user.PASSWORD)
                console.log("loggin success",)
                socket.emit("logging_success", [user.USERNAME, user.USER_ID])
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
async function get_selling_itmes(user, socket) {
    
        const [rows]  = await pool.query(`
            SELECT * 
            FROM USERS
            WHERE USERNAME =?`, [user]);
       

        const user_selling_id =  rows[0].USER_ID

        const [items]  = await pool.query(`
         SELECT * FROM ITEM WHERE SELLER_ID = ${1}`);
        console.log("item selling:", items);
        socket.emit("retive_selling_item", items)
    
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
        signup(fname, lname, username, password, socket);
    });

    socket.on("item", ({title,image_1,image_2,image_3,description,price,id})=>{
        item(title,image_1,image_2,image_3,description,price,id,socket) 
    }) ;

    socket.on("item", ({title,image_1,image_2,image_3,description,price,id})=>{
        item(title,image_1,image_2,image_3,description,price,id,socket) 
    }) ;
    socket.on("get_selling_item", (user)=>{
        get_selling_itmes(user, socket);
        }
    );


 });



server.listen(3000, () => {
  console.log('server starta');
});

