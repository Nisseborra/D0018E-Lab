
import { useState } from 'react'
import { useNavigate} from "react-router-dom";

function startmenu(){
    const nav = useNavigate(); 
      const [count, setCount] = useState(0)

    return(
        <div id ="stanard">

            <button onClick={()=> nav("/loggin")}>Logg in</button> <br></br>
            <button onClick={()=> nav("/signup")}>Sign Up</button><br></br>
           
           
        </div>
    )
}

export default startmenu;