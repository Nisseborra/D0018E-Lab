const mysql = require('mysql2');
const express = require('express');
const http = require('http');
const { connect } = require('http2');
const { disconnect } = require('process');
const socketIO = require('socket.io');
const { Server } = require('socket.io');
const { socket } = require('../Frontend/assets/socket');
const { log } = require('console');
const multer = require('multer');


const app = express();
const server = http.createServer(app);

const pool = mysql.createPool({
    host:'localhost',            //process.env.MYSQL_HOST,
    user:'root' ,               //process.env.MYSQL_USER,
    password:'Root1234',              //process.env.MYSQL_PASSWORD,
    database:'D0018E'               ///process.env.MYSQL_DATABASE
}).promise()

///////////////////// Files to Local public folder

const storage = multer.diskStorage({
     destination: function (req, file, cb) {
          cb(null, './Frontend/website/public/uploads')
    },
   filename: function (req, file, cb) {
         cb(null, Date.now() + '-' + file.originalname); // [] gonna need to place the date the image was created later
   }
});

//const Filesize= 5*1024*1024; //if we want to add a limiter to the size of image before upload

const upload = multer({ storage: storage})

app.post('/upload', upload.fields([
    { name: 'image_1', maxCount: 1 },
    { name: 'image_2', maxCount: 1 },
    { name: 'image_3', maxCount: 1 }  
]), async(req, res) => {
    const userId = Number(req.body.userId);
    const title = req.body.title;
    const description = req.body.description;
 
    const price = req.body.price;
    const image_1 = req.files.image_1?.[0]?.filename||null;
    const image_2 = req.files.image_2?.[0]?.filename||null;
    const image_3 = req.files.image_3?.[0]?.filename||null;
    
    
     const[rows] = await pool.query(`
        SELECT *
        FROM USERS
        WHERE USER_ID = ${userId}

    `)
    //TEMPORARY
    const[CATEGORY] = await pool.query(`
        SELECT *
        FROM CATEGORY
        WHERE CATEGORY_ID  = ${1}

    `)
    const username = rows[0].USERNAME;

    
    const category = CATEGORY[0].CATEGORY_ID
    await pool.query(`
        INSERT INTO ITEM  
        (USER_ID,TITLE, DESCRIPTION, CATEGORY_ID, PRICE, IMAGE_1, IMAGE_2, IMAGE_3,CREATED_BY )
        VALUES (?, ?, ?, ?, ?, ?, ?,?,?)`,
        [userId,title, description,category,price,image_1,image_2,image_3,username]
        );    

     //res.send('File uploaded successfully from multer.');
     res.redirect('http://localhost:5173/home');
     

});

//////////////////// DATABASE TABLE GETERS

async function getItem() {
  //console.log("calling");
  const [rows] = await pool.query("SELECT * FROM ITEM");
  console.log(rows);
  
  return rows;
}

//get the title from each category
async function category_list(socket) {
    const[rows] = await pool.query(`
        SELECT TITLE
        FROM CATEGORY


    `) 
    //console.log(rows);
    
    //console.log(list);
    socket.emit("category_map", rows);
    //return rows.length;
}


//get the info of all item TEMPORARY FROM CATEGORY ID 0 from each ITEM for the template of category
async function category_template(socket) {
    const[rows] = await pool.query(`
        SELECT TITLE,PRICE,IMAGE_1
        FROM ITEM 
        WHERE CATEGORY_ID = ${1}
        AND IS_SOLD =  ${0}


    `) 
    console.log(rows);
    
    //console.log(list);
    socket.emit("template_map", rows);
    //return rows.length;
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
    
    socket.on("get_selling_item", (user)=>{
        get_selling_itmes(user, socket);
        }
    );

    socket.on("category_list", ()=>{
        category_list(socket) 
    }) ;
    socket.on("category_template", ()=>{
        category_template(socket) //lägg till id
    }) ;

 });



server.listen(3000, () => {
  console.log('server starta');
});

