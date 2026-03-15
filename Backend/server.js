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

//const { default: admin } = require('../Frontend/website/src/Pages/admin');


const app = express();
const server = http.createServer(app);

const pool = mysql.createPool({
    host:'localhost',            //process.env.MYSQL_HOST,
    user:'root' ,               //process.env.MYSQL_USER,
    password:'Root1234',   
    //password:'root'      
     database:'d0018e'     //process.env.MYSQL_PASSWORD,
    //database:'D0018E'               ///process.env.MYSQL_DATABASE
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
        (TITLE, USER_ID,DESCRIPTION, CATEGORY_ID, PRICE, IMAGE_1, IMAGE_2, IMAGE_3,CREATED_BY )
        VALUES ( ?, ?,?, ?, ?, ?, ?,?,?)`,
        [title, userId,description,categoryID,price,image_1,image_2,image_3,username]
        );    

     //res.send('File uploaded successfully from multer.');
     //res.redirect('http://localhost:5173');
     
});
/*

app.post('/update', upload.fields([
    { name: 'image_1', maxCount: 1 },
    { name: 'image_2', maxCount: 1 },
    { name: 'image_3', maxCount: 1 }  
]), async(req, res) => {

    const itemId = Number(req.body.itemId);
    const [rows] = await pool.query(
        `SELECT * FROM ITEM WHERE ITEM_ID = ${itemId}`,
    );

    const item = rows[0];
    //reaquestion the data and files from the form
    
    const title = req.body.title || item.TITLE;
    const description = req.body.description || item.DESCRIPTION;
    const categoryID = req.body.categoryID || item.CATEGORY_ID;
    const price = req.body.price || item.PRICE;

    const image_1 = req.files.image_1?.[0]?.filename || item.IMAGE_1;
    const image_2 = req.files.image_2?.[0]?.filename || item.IMAGE_2;
    const image_3 = req.files.image_3?.[0]?.filename || item.IMAGE_3;
    
    //insert the updated info into item table
        await pool.query(
        `UPDATE ITEM
        SET 
        TITLE = ?,
        DESCRIPTION = ?,
        CATEGORY_ID = ?,
        PRICE = ?,
        IMAGE_1 = ?,
        IMAGE_2 = ?,
        IMAGE_3 = ?
        WHERE ITEM_ID = ?
        `,
        [title, description, categoryID, price, image_1, image_2, image_3, itemId]
        );

     //res.send('File uploaded successfully from multer.');
     //res.redirect('http://localhost:5173/home');
     
});

*/

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
    socket.emit("category_map", rows);
    //return rows.length;
}
//get the reviews the user has gotten
async function review_template(id, socket) {

  const [reviews] = await pool.query(
    `SELECT RATE.DESCRIPTION
     FROM ITEM
     JOIN RATE ON ITEM.ITEM_ID = RATE.ITEM_ID
     WHERE ITEM.USER_ID = ?`,
    [id]
  );

  console.log(reviews);

  socket.emit("review_map", reviews);
}
//get the info of all item TEMPORARY FROM CATEGORY ID 0 from each ITEM for the template of category
async function category_template(id,socket) {
    console.log(id)
    const[rows] = await pool.query(`
        SELECT TITLE,PRICE,IMAGE_1,ITEM_ID,USER_ID
        FROM ITEM 
        WHERE CATEGORY_ID = ${id}
        AND IS_SOLD =  ${0}
    `) 
    //console.log(rows);
    
    console.log("category_template:", rows);
    socket.emit("template_map", rows);
    //return rows.length;
}
//get the info of the item FROM ITEM ID 
async function card_template(id,socket) {
    console.log(id);
    
    const[rows] = await pool.query(`
        SELECT TITLE,PRICE,IMAGE_1,IMAGE_2,IMAGE_3,DESCRIPTION,ITEM_ID
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
        SELECT USERNAME, PASSWORD, USER_ID, IS_ADMIN
        FROM USERS
        WHERE USERNAME =?`, [username]);
        const user = rows[0];
        if(user === undefined){
            socket.emit("loggin_error", "wrong username or passoword")
            return
        }
        if(user.USERNAME === username && user.PASSWORD === password){
                console.log("loggin success",)
                if(user.IS_ADMIN === 0){
                socket.emit("logging_success", [user.USERNAME, user.USER_ID])
                return
                }
                if(user.IS_ADMIN === 1){
                    socket.emit("loggin_success_admin", [user.USERNAME, user.USER_ID, user.IS_ADMIN])
                    return
                }

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
        WHERE USER_ID =? 
        AND IS_ORDERD = 0`, [user[1]]);
        const basket = baksetid[0]
        console.log(basket)

    if(basket === undefined){
        socket.emit("failed get basket", "add to basket")
        return;
    }

    // går igenom 
    const [items] = await pool.query(`
        SELECT TITLE, PRICE,ITEM.ITEM_ID, IS_SOLD
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
            console.log("new basket for", user[1],"basket:", basket)
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
            INSERT INTO BASKET_ITEM (Basket_ID, ITEM_ID)
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
            DELETE FROM BASKET_ITEM WHERE BASKET_ID =? AND ITEM_ID =?`, [basket.BASKET_ID, item.ITEM_ID]);

        
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

async function buy(user, items, socket) {
        console.log("olditems: ", items)
        const [baksetid] = await pool.query(`
        SELECT *
        FROM BASKET
        WHERE USER_ID =? AND IS_ORDERD = ?`, [user[1], 0]);
        const basket = baksetid[0]
        
        /* 1. look if items is still unsold
                1.2 removed the bought items and send back the item that are not unsold.
        */
        const [updated_items] = await pool.query(`
        SELECT TITLE, IS_SOLD
        FROM ITEM
        JOIN BASKET_ITEM ON ITEM.ITEM_ID = BASKET_ITEM.ITEM_ID 
        WHERE BASKET_ID =?` , [basket.BASKET_ID]);
            
        const solditems = updated_items.find(item=> item.IS_SOLD ===1);

            if(solditems ){
                        socket.emit("item_sold", (solditems.TITEL))
                        return
                    }


       // update basket
        await pool.query(`
            UPDATE BASKET
            SET IS_ORDERD = 1
            WHERE USER_ID =? `, [user[1]] );

        // update item
        await pool.query(`
            UPDATE ITEM
            JOIN BASKET_ITEM ON ITEM.ITEM_ID = BASKET_ITEM.ITEM_ID 
            SET IS_SOLD = 1
            WHERE BASKET_ID =?
            AND  IS_SOLD = 0 `, [basket.BASKET_ID] );

        // created order
           const [order] = await pool.query(`
            INSERT INTO ORDERS (STATUS, BASKET_ID)
                VALUES (?,? )`, [0, basket.BASKET_ID]);

            const orderid = order.insertId;
            console.log("orderid: ",orderid)
         
            
      for (let item of items){
          await pool.query(`
            INSERT INTO ORDERS_ITEM (PRICE_SUM, QUANTITY, ORDER_ID, ITEM_ID)
                VALUES (?,?,?,? )`, [item.PRICE, 1,  orderid, item.ITEM_ID]);
      }
 
        socket.emit("PURSHES", "items have been purshed")     
        console.log("new items:", updated_items)
}

async function get_users(socket) {
    console.log("get_users admin")
     const [users] = await pool.query(`
        SELECT *
        FROM USERS
        WHERE IS_ADMIN =?` , [0]);

    socket.emit("retive_users", users)


    
}

async function review(rating, description,ID,user) {
    // retriving the itemid from order items
    console.log("TESR", rating);
    const idNum = Number(ID);

    //checks if the item has already been rated
    const [rateing] = await pool.query(
        `SELECT 
        CASE 
        WHEN COUNT(*) > 0 THEN 'EXISTS'
        ELSE 'NOT_EXISTS'
        END AS RATE
        FROM RATE
        WHERE ITEM_ID = ?`,
        [idNum]
    );    

    const rate = rateing[0].RATE; //rating of item

    // retriving the USE_ID of the seller 
    const [users] = await pool.query(
        `SELECT USER_ID
         FROM ITEM
         WHERE ITEM_ID = ?`,
        [idNum]
    );
    const seller_id = users[0].USER_ID; // seller_id


    //insert the inital review INSERTED
    if (rateing[0].RATE === 'NOT_EXISTS') {
        await pool.query(`
        INSERT INTO RATE (DESCRIPTION,RATING,ITEM_ID,USER_ID)
        VALUES (?, ?, ?, ?)`, [description, rating,idNum,seller_id]
        ); 
       
    }
    else{
    //UPDATE RATING
    await pool.query(`
    UPDATE RATE  
    SET RATING = ?,
    DESCRIPTION = ?
    WHERE ITEM_ID`, [rating, description,idNum]
    ); 

    
    //use avg method inorde to get avg score
    await pool.query(`
        UPDATE RATE  
        SET RATING = ?,
        DESCRIPTION = ?
        WHERE ITEM_ID = ?
    `, [rating, description, idNum]);
        const avg = rows[0].AVERAGE
   

    await pool.query(
        `UPDATE USERS
         SET AVG = ?
         WHERE USER_ID = ?`,
        [avg, seller_id]
    );
    }
}

async function  delete_user(user, socket) {
    console.log("delet user:", user.USERNAME)
         const [baksetid] = await pool.query(`
            SELECT *
            FROM BASKET
            WHERE IS_ORDERD = 0 AND USER_ID =? ` , [user[1]]);
        const basket = baksetid[0]

            
        await pool.query(`
            DELETE FROM BASKET_ITEM WHERE BASKET_ID =? `, [user.USER_ID]);

        await pool.query(`
            DELETE FROM BASKET WHERE USER_ID =? `, [user.USER_ID]);
          

    await pool.query(`
            DELETE FROM USERS WHERE USER_ID =? AND USERNAME =?`, [user.USER_ID, user.USERNAME]);
    get_users(socket);

    
}

async function get_items(socket) {
    console.log("get_item admin")
     const [items] = await pool.query(`
        SELECT *
        FROM ITEM`);

    socket.emit("retive_item", items)
}

async function delete_item(item, socket) {
   
        // delet from ITEM
    await pool.query(
        `DELETE FROM ITEM WHERE ITEM_ID = ?`,
        [item]
    );
     // delet from basket_ITEM
    await pool.query(
        `DELETE FROM basket_ITEM WHERE ITEM_ID = ?`,
        [item]
    )


    get_items(socket);
}


async function signup_admin(fname, lname, username, password, socket) {
        const [rows]  = await pool.query(`
        SELECT USERNAME
        FROM USERS
        WHERE USERNAME =?`, [username]);
        const user = rows[0]
        if(user !== undefined){
            socket.emit("signup_error_admin", "Username or account already exist")
            return
        }

        await pool.query(`
        INSERT INTO USERS (USERNAME, FNAME, LNAME, PASSWORD, IS_ADMIN)
         VALUES (?,? ,?, ?, ?)`, [username, fname, lname,password, 1]
        );

        socket.emit("signup_success_admin", "succeful sign up")

}



async function ADMIN_CHECK(ADMIN, socket) {
        const [users] = await pool.query(`
        SELECT USERNAME, USER_ID, IS_ADMIN
        FROM USERS
        WHERE USERNAME =? AND USER_ID  =? AND IS_ADMIN= ?`, [ADMIN[0], ADMIN[1], ADMIN[2] ]);
        const admin = users[0];
    
        if(admin){
            console.log("is_ADMIN:", admin)
            return;
        }
        else{
            console.log("IS NOT ADMIN");
            socket.emit("NOT_ADMIN","NOT ADMIN")
    }
}

async function Profile(userId, socket) {
    try {
        // "*" pulls every column: USER_ID, USERNAME, PASSWORD, FNAME, LAST_NAME, etc.
        const [rows] = await pool.query(
            "SELECT * FROM USERS WHERE USER_ID = ?",
            [userId]
        );

        if (rows.length > 0) {
            // Send the entire row object (all columns) to the frontend
            socket.emit("profile_data", rows[0]);
        }
    } catch (error) {
        console.error("Database Error:", error);
    }
}


async function update_password(userId, newPassword, socket) {
    console.log("--- UPDATE ATTEMPT ---");
    console.log("ID received:", userId);
    console.log("String received:", newPassword);

    try {
        const [result] = await pool.query(
            "UPDATE USERS SET PASSWORD = ? WHERE USER_ID = ?",
            [newPassword, userId]
        );

        console.log("Rows affected in MySQL:", result.affectedRows);

        if (result.affectedRows > 0) {
            socket.emit("update_success", "Password updated on disk.");
        } else {
            console.log("WARNING: No row found with that USER_ID.");
        }
    } catch (error) {
        console.error("SQL ERROR:", error);
        socket.emit("update_error", "Database write failed.");
    }
}

async function get_raw_history(userId, socket) {
    try {
        // We pull every item linked to a basket owned by this user 
        // that has been finalized into an order.
        const [rows] = await pool.query(`
            SELECT 
                i.TITLE, 
                oi.PRICE_SUM, 
                oi.QUANTITY,
                oi.ITEM_ID, 
                o.ORDER_ID
            FROM USERS u
            INNER JOIN BASKET b ON u.USER_ID = b.USER_ID
            INNER JOIN ORDERS o ON b.BASKET_ID = o.BASKET_ID
            INNER JOIN ORDERS_ITEM oi ON o.ORDER_ID = oi.ORDER_ID
            INNER JOIN ITEM i ON oi.ITEM_ID = i.ITEM_ID
            WHERE u.USER_ID = ?
        `, [userId]);
        console.log("history data: ", rows);
        
        socket.emit("history_data_raw", rows);
    } catch (error) {
        console.error("Mechanical Fetch Error:", error);
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

    socket.on("review", ({rating, description,ID,user})=>{
         review(rating, description,ID, user);
    });
    socket.on("fetch_history", (userId) => {
    get_raw_history(userId, socket);
});
    socket.on("update_password", ({ userId, newPassword }) => {   
        update_password(userId, newPassword, socket);
    });


    socket.on("signup",({fname, lname, username, password})=>{
        signup(fname, lname, username, password, socket);
    });

    socket.on("signup_admin",({fname, lname, username, password, admin})=>{
        ADMIN_CHECK(admin,socket);
        signup_admin(fname, lname, username, password, socket);
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
       
          RemoveItem(user, item, socket)
    })

    socket.on("addBasket", ({user, item})=>{

        addbasket(user, item, socket)
    })
    socket.on("buy",  ({user, items})=>{
        buy(user, items, socket)
    })

    socket.on("category_list", ()=>{
        category_list(socket) 
    });

    socket.on("review_template", (id)=>{
        review_template(id,socket) 
    }); 

    socket.on("category_template", (id)=>{
        category_template(id,socket) 
    });
    socket.on("card_template", (id)=>{
        card_template(id,socket) 
    }) ;

    socket.on("getusers", (admin)=>{
        ADMIN_CHECK(admin, socket)
        console.log("get_user_admin")
        get_users(socket)
    })

    socket.on("delet_user", (user1 )=>{

         const user = user1[0]
        const admin = user1[1]
          ADMIN_CHECK(admin, socket)
        delete_user(user, socket)
    } )

    socket.on("getitems", (admin)=>{
        ADMIN_CHECK(admin, socket)
        console.log("get_items")
        get_items(socket);
    })
    socket.on("seller_delete_item", (item1)=>{
        delete_item(item1, socket);
    })
    socket.on("delete_item", (item1)=>{
                const item = item1[0]
                const admin = item1[1]
            ADMIN_CHECK(admin, socket)
            delete_item(item, socket);
    })
   


 });



server.listen(3000, () => {
  console.log('server starta');
});

