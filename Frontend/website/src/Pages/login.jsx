
import { constants } from "picomatch/lib/picomatch";
import { useNavigate} from "react-router-dom";
import { socket } from "../../../assets/socket";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";



export default function Loggin(){
    const nav = useNavigate();
     useEffect(()=> {
      
        const loggin_success =(username)=>{
            alert("Correct")
            nav("/")
        }

        const loggin_error = (msg)=>{
                alert(msg)
        }

        socket.on("logging_success", loggin_success )
        socket.on("loggin_error", loggin_error)
        

     return () => {
        socket.off("logging_success", loggin_success )
        socket.off("loggin_error", loggin_error)
      
    };
       
    }, [])


function logg(){
            console.log("loggin in button pressed")
            const username = document.getElementById("log_username").value;
            const Password = document.getElementById("log_password").value;
            socket.emit("loggin", {username, Password})

        }

    return(
        <div>
            <h1>
                Loggin
            </h1>
                <label >Username: </label> <br></br>
                <input id="log_username" placeholder="Username"></input> <br></br>

      <label >Password: </label> <br></br>
    <input id="log_password" placeholder="Password"></input> <br></br>
    <button onClick={()=>nav("/")}>back</button>
    <button onClick={logg}>loggin</button>
        
        </div>

        
    )
}