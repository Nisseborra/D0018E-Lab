
import { useState } from 'react'
import { useNavigate} from "react-router-dom";

function startmenu(){
    const nav = useNavigate(); 
      const [count, setCount] = useState(0)

    return(

        <body>
            <button onClick={()=> nav("/loggin")}>Logg in</button> <br></br>
            <button onClick={()=> nav("/signup")}>Sign Up</button>
        </body>
    )
}

export default startmenu;