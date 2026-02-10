
import { useNavigate} from "react-router-dom";
import { socket } from "../../../assets/socket";
import { useEffect } from "react";



export default function Signup(){


  
        
       const nav = useNavigate();

        useEffect(()=> {
        
               socket.on("signup_error",(msg)=>{
                alert(msg);
               });
       
               socket.on("signup_success", (msg)=>{
                alert(msg);
                nav("/")
               })

            return () => {
               
           };
              
           }, [])

              function Signup(){
        const fname = document.getElementById("fname").value;
        const lname  = document.getElementById("lname").value;
        const username  = document.getElementById("username").value;
        const password  = document.getElementById("password").value;
        console.log("fname", fname)
        console.log("lname", lname)
        console.log("username", username)
        console.log("password", password)

        socket.emit("signup", ({fname,lname,username,password}));
    }
   

    return(
        <div>
            <h1>
                Logging
            </h1>
             <label >firstname: </label> <br></br>
                <input id = "fname" placeholder="Firstname"></input> <br></br>

                <label >Lastname: </label> <br></br>
                <input  id = "lname"placeholder="Lastname"></input> <br></br>

                <label >Username: </label> <br></br>
                <input  id = "username"placeholder="Username"></input> <br></br>

                <label >Password: </label> <br></br>
                <input id = "password" placeholder="Password"></input> <br></br>
    <button onClick={()=>nav("/")}>back
    </button>
    <button onClick={Signup}>Signup</button>
        
    </div>
    )

}