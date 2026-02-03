
import { useNavigate} from "react-router-dom";



export default function Signup(){
        //test
       const nav = useNavigate();



    return(
        <div>
            <h1>
                Logging
            </h1>
             <label >firstname: </label> <br></br>
                <input  placeholder="Firstname"></input> <br></br>

                <label >Lastname: </label> <br></br>
                <input  placeholder="Lastname"></input> <br></br>

                <label >Username: </label> <br></br>
                <input  placeholder="Username"></input> <br></br>

      <label >Password: </label> <br></br>
    <input  placeholder="Password"></input> <br></br>
    <button onClick={()=>nav("/")}>back
    </button>
    <button>Loggin</button>
        
        </div>
    )

}