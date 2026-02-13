
import { useNavigate} from "react-router-dom";
import { socket } from "../../../assets/socket";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";



export default function homemenu(){      
       const nav = useNavigate();
       const location = useLocation();
       const user = location.state;

        useEffect(()=> {
        
    
              
           }, [])

      
   function logout(){
    nav("/", {state:null})
   }

    return(
    <div>
    <div className="navbar" >
        <nav>
            <label id="navbar">Get ride of stuff</label>
            <ul>
                <li><button >Bought</button></li>
                <li><button >Selling</button></li>
                <li><button>Basket</button></li>
                <li><button onClick={logout}>Logg out</button></li>
                <li><a>Loggin as {user} </a></li>
              
            </ul>
        </nav>
    </div>

    </div>
    )

}