import { constants } from "picomatch/lib/picomatch";
import { useNavigate} from "react-router-dom";
import { socket } from "../../../assets/socket";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import Admin_user from "./Admin_user";
import Admin_items from "./Admin_items";
import Admin_account from "./Admin_account";
import { useState } from "react";




export default function admin(){
    const nav = useNavigate();
    const location = useLocation();
    const user = location.state;
    
    const [showuser, setshowuser] =useState(false);
    const [showitems, setshowitems] =useState(false);
    const [showcreateadmin, setcreateadmin] =useState(false);


    const [categories, setCategories] = useState([]);

     useEffect(()=> {

        socket.emit("category_list");



        const NOT_ADMIN = (msg)=>{
            alert(msg)
            nav("/", {state: null})
            
        }

        const list = (listmap) =>{
        console.log("get catgories", listmap)
        setCategories(listmap);
        }


        socket.on("NOT_ADMIN", NOT_ADMIN);
        socket.on("category_map", list);
      
      
     
        

     return () => {
          socket.off("category_map", list)
          socket.off("NOT_ADMIN", NOT_ADMIN);
      
    };
       
    }, [])


    function loggut (){
         alert("logg out")
        nav("/", {state: null})
            
    }


    if(showuser){
        return(
            <Admin_user close ={()=> setshowuser(false)}  admin= {user} ></Admin_user>
        )

    }

        if(showitems){
        return(
            <Admin_items close ={()=> setshowitems(false)}  admin= {user} categories = {categories}></Admin_items>
        )

    }


        if(showcreateadmin){
        return(
            <Admin_account close ={()=> setcreateadmin(false)}  admin= {user}></Admin_account>
        )

    }
    


    return(
     <div id ="standard">
            <h1>ADMIN</h1> <br></br>
            <h2>ADMIN USER: {user[0]}</h2> <br></br>
            <button onClick={()=> setshowuser(true)}>USERS</button> <br></br>
            <button onClick={()=> setshowitems(true)}> ITEMS </button><br></br>
            <button onClick={()=> setcreateadmin(true)}> CREATE ADMIN ACCOUNT</button><br></br>
            <button onClick={()=> loggut()}>loggut</button>
           
        </div>

        
    )
}