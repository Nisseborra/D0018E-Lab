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
 //gives you full control on storing files to disk.
const storage = multer.diskStorage({
     destination: function (req, file, cb) {
          cb(null, './Frontend/website/public/uploads')
    },
   filename: function (req, file, cb) {
         cb(null, Date.now() + '-' + file.originalname); // [] gonna need to place the date the image was created later
   }
});



const upload = multer({ storage: storage})

app.post('/upload', upload.fields([
    { name: 'image_1', maxCount: 1 },
    { name: 'image_2', maxCount: 1 },
    { name: 'image_3', maxCount: 1 }  
]), async(req, res) => {

    //reaquestion the data and files from the form
    const userId = Number(req.body.userId);
    const title = req.body.title;
    const description = req.body.description;
    const categoryID = Number(req.body.categoryID);
    
    const price = Number(req.body.price);
    const image_1 = req.files.image_1?.[0]?.filename||null;
    const image_2 = req.files.image_2?.[0]?.filename||null;
    const image_3 = req.files.image_3?.[0]?.filename||null;
    
    
     const[rows] = await pool.query(`
        SELECT *
        FROM USERS
        WHERE USER_ID = ${userId}

    `)
    const username = rows[0].USERNAME;

    
    //insert the detail into item
    await pool.query(`
        INSERT INTO ITEM  
        (TITLE, DESCRIPTION, CATEGORY_ID, PRICE, IMAGE_1, IMAGE_2, IMAGE_3,CREATED_BY )
        VALUES ( ?, ?, ?, ?, ?, ?,?,?)`,
        [title, description,categoryID,price,image_1,image_2,image_3,username]
        );    

     //res.send('File uploaded successfully from multer.');
     //res.redirect('http://localhost:5173/home');
     
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
        SELECT TITLE,CATEGORY_ID
        FROM CATEGORY


    `) 
    //console.log(rows);
    
    //console.log(list);
    socket.emit("category_map", rows);
    //return rows.length;
}


//get the info of all item TEMPORARY FROM CATEGORY ID 0 from each ITEM for the template of category
async function category_template(id,socket) {
    const[rows] = await pool.query(`
        SELECT TITLE,PRICE,IMAGE_1,ITEM_ID
        FROM ITEM 
        WHERE CATEGORY_ID = ${id}
        AND IS_SOLD =  ${0}


    `) 
    //console.log(rows);
    
    //console.log(list);
    socket.emit("template_map", rows);
    //return rows.length;
}
//get the info of the item FROM ITEM ID 
async function card_template(id,socket) {
    console.log(id);
    
    const[rows] = await pool.query(`
        SELECT TITLE,PRICE,IMAGE_1,DESCRIPTION,ITEM_ID
        FROM ITEM 
        WHERE ITEM_ID = ${id}
        


    `) 
    console.log(rows);
    
    //console.log(list);
    socket.emit("card", rows);
    //return rows.length;
}

async function Loggin(username, password, socket) {
    const [rows]  = await pool.query(`
        SELECT USERNAME, PASSWORD, USER_ID
        FROM USERS
        WHERE USERNAME =?`, [username]);
        const user = rows[0];
        if(user === undefined){
            socket.emit("loggin_error", "wrong username or passoword")
            return
        }
        if(user.USERNAME === username && user.PASSWORD === password){
                console.log("loggin success",)
                socket.emit("logging_success", [user.USERNAME, user.USER_ID])
                return
        }
        socket.emit("loggin_error", "wrong username or passoword") 
   
    
}

async function signup(fname, lname, username, password, socket) {
        const [rows]  = await pool.query(`
        SELECT USERNAME
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

        socket.emit("signup_success", "succeful sign up")

}

async function get_selling_itmes(user, socket) {
        const [items]  = await pool.query(`
         SELECT * FROM ITEM WHERE USER_ID = ${user[1]}`);
        socket.emit("retive_selling_item", items)
}

async function Basket(user, socket) {
     const [baksetid] = await pool.query(`
        SELECT *
        FROM BASKET
        WHERE USER_ID =? `, [user[1]]);
        const basket = baksetid[0]

    if(basket === undefined){
        socket.emit("failed get basket", "add to basket")
        return;
    }

    // går igenom 
    const [items] = await pool.query(`
        SELECT TITLE, PRICE,ITEM.ITEM_ID
        FROM ITEM
        JOIN BASKET_ITEM ON ITEM.ITEM_ID = BASKET_ITEM.ITEM_ID 
        WHERE BASKET_ID =?`, [basket.BASKET_ID]);

        socket.emit("basket_items", items)
        return

    };


async function addbasket(user, item, socket) {
        // kolla om det finns en basket
        //kollar IS_ORDER = 0 och USER_ID FÖR BASKET
        const [baksetid] = await pool.query(`
        SELECT *
        FROM BASKET
        WHERE IS_ORDERD = 0 AND USER_ID =? ` , [user[1]]);
        var basket = baksetid[0]
        //console.log(basket)
        if(basket === undefined ){
            console.log("basket dont exist for ", user[1])
            //SKAPAR BASKET
             await pool.query(`
            INSERT INTO BASKET (IS_ORDERD, USER_ID)
                VALUES (?,? )`, [0, user[1]]); 

            const [baksetid] = await pool.query(`
            SELECT *
                FROM BASKET
                WHERE IS_ORDERD = 0 AND USER_ID =? ` , [user[1]]);

            basket = baksetid[0]


            }

        if(item.IS_SOLD ===1){
            socket.emit("item_error", "item already sold")
            return
        }
        //kollar om item är readan i basket
         const [check_item_in_basket] = await pool.query(`
        SELECT *
        FROM BASKET_ITEM
        WHERE BASKET_ID = ? AND ITEM_ID =? ` , [basket.BASKET_ID, item.ITEM_ID]);
        const check = check_item_in_basket[0]
        if(!(check === undefined)){
            socket.emit("item_error", "item already in basket")
            return
        }

        // ska också lägga till så man inte kan köpa sin egna product

        await pool.query(`
            INSERT INTO BASKET_item (Basket_ID, ITEM_ID)
                VALUES (?,? )`, [basket.BASKET_ID, item.ITEM_ID]); 
        
        socket.emit("item_added", (item.TITLE))
        return
}

async function RemoveItem(user, item, socket) {
        const [baksetid] = await pool.query(`
            SELECT *
            FROM BASKET
            WHERE IS_ORDERD = 0 AND USER_ID =? ` , [user[1]]);
        const basket = baksetid[0]
        console.log(basket)
        if(basket === undefined ){
            console.log("DELETE BUG")
            return
        }

        await pool.query(`
            DELETE FROM BASKET_item WHERE BASKET_ID =? AND ITEM_ID =?`, [basket.BASKET_ID, item.ITEM_ID]);

        
        console.log("delet success")
        
         const [items] = await pool.query(`
        SELECT *
        FROM ITEM
        JOIN BASKET_ITEM ON ITEM.ITEM_ID = BASKET_ITEM.ITEM_ID 
        WHERE BASKET_ID =?`, [basket.BASKET_ID]);
        console.log("Basket_item:", items)

        socket.emit("basket_items", items)
        return
            

    
}


async function Profile(userId, socket) {
    const [rows] = await pool.query(
        "SELECT USERNAME, PASSWORD FROM USERS WHERE USER_ID = ?",
        [userId]
    );

    if (rows.length > 0) {
        // Send the row containing the strings back to the frontend
        socket.emit("profile_data", rows[0]);
    }
}

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});




io.on('connection', (socket) => {
        console.log('connected:', socket.id);
    
    socket.on("profile", (userId) => {
        // When the string "profile" arrives in the packet, run this:
        Profile(userId, socket);
    });

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

    socket.on("getBasket", (user)=>{
        Basket(user,socket)
    })
    socket.on("removeITEM",async ({user,item})=>{
        console.log(user)
          console.log(item)
          RemoveItem(user, item, socket)
    })

    socket.on("addBasket", ({user, item})=>{

        console.log("addbasket user:", user)
         console.log("addbasket item:", item)
        addbasket(user, item, socket)
    })

    socket.on("category_list", ()=>{
        category_list(socket) 
    }) ;
    socket.on("category_template", (id)=>{
        category_template(id,socket) 
    }) ;
    socket.on("card_template", (id)=>{
        card_template(id,socket) 
    }) ;


 });



server.listen(3000, () => {
  console.log('server starta');
});

