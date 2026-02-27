import { socket } from "../../../assets/socket";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export default function Admin_user({close, admin}) {
 
    const [users, setusers] = useState( []);

 
    
 



    useEffect(()=> {
        console.log("get_USERS_FRONTEND")
        socket.emit("getusers",(admin));
        


    const retive_users =(users)=>{
        setusers(users)
        console.log("user recicved:", users)
    }

     socket.on("retive_users", retive_users )
     

        


     return () => {
         socket.off("retive_users", retive_users )

      
    
    };
       
    }, [])


    function remove_user(user){
        if(confirm(`CONFIRM DELETE USER: ${user.USERNAME} `) == true){
           socket.emit("delet_user", [user, admin]);
        }
        else{
            alert("DIDNT DELET USER")
        }
    }


    
    if(users.length === 0){
        return(
            <div id="center">
    <h2>USERS</h2>
    <h3> NO USERS</h3>

   

        <button onClick={()=> close()} >Back</button>
        </div>
        )
    }
    


return(
<div id="center">
    <h2>Users</h2>
<br></br>
    <table>
        <thead>
        <tr>
            <th>USER_ID</th>
            <th>USERNAME</th>
            <th>FIRSTNAME</th>
            <th>LASTNAME</th>
            <th>Remove</th>
           
        </tr>
        </thead>
        <tbody>
            {Object.values(users).map((user, i) =>(
                <tr key ={i}>
                <td>{user.USER_ID}</td>
                <td>{user.USERNAME}</td>
                <td>{user.FNAME}</td>
                <td>{user.LNAME}</td>
                <td><button onClick={()=> remove_user(user)}>-</button></td>
             
                
                </tr>
            ))}
        </tbody>
    </table>
   

<button onClick={()=> close()} >Back</button>




</div>
    );

}




