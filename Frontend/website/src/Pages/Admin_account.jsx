
import { useNavigate} from "react-router-dom";
import { socket } from "../../../assets/socket";
import { useEffect } from "react";



export default function signup_admin({close, admin, categories}){      
      

        useEffect(()=> {

            const signup_error_admin = (msg)=>{
                alert(msg);
               }

               const signup_success_admin =  (msg)=>{
                alert(msg);
                close();


               }
        
               socket.on("signup_error_admin", signup_error_admin );
       
               socket.on("signup_success_admin", signup_success_admin)

            return () => {
                 socket.off("signup_error_admin", signup_error_admin );
       
               socket.off("signup_success_admin", signup_success_admin)

           };
              
           }, [])

        function Signup_admin(){
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
            
        socket.emit("signup_admin", ({fname,lname,username,password, admin}));
    }
   

    return(
        <div>
            <h1>
                SIGNUP ANOTHER ADMIN ACCOUNT
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


    <button onClick={()=>close()}>back</button>
    <button onClick={Signup_admin} type="submit">Signup</button>
        
    </div>
    )

}