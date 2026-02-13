
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
            const Cpassword  = document.getElementById("confirm password").value;

            if((fname|| lname|| username|| password) === ""){
                alert("fill out all the field")
                return;
            }

            if(password !== Cpassword){
                alert("Password are not the same");
            }
            
           


        socket.emit("signup", ({fname,lname,username,password}));
    }
   

    return(
        <div>
            <h1>
                Signup
            </h1>
             <label >firstname: </label> <br></br>
                <input id = "fname" placeholder="Firstname" maxLength={15} required></input> <br></br>

                <label >Lastname: </label> <br></br>
                <input  id = "lname" placeholder="Lastname" maxLength={15}required ></input> <br></br>

                <label >Username: </label> <br></br>
                <input  id = "username"placeholder="Username" maxLength={15} required ></input> <br></br>

                <label >Password: </label> <br></br>
                <input id = "password" placeholder="Password" type="password" maxLength={255} required ></input> <br></br>

                <label >Confirm Password: </label> <br></br>
                <input id = "confirm password" placeholder="Confirm Password" type="password" maxLength={255} required ></input> <br></br>


    <button onClick={()=>nav("/")}>back
    </button>
    <button onClick={Signup} type="submit">Signup</button>
        
    </div>
    )

}