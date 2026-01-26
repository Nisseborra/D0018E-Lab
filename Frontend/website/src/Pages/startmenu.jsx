
import { useState } from 'react'
import { useNavigate} from "react-router-dom";

function startmenu(){
      const [count, setCount] = useState(0)

    return(

        <body>
            <button>Logg in</button> <br></br>
            <button>Sign Up</button>
        </body>
    )
}

export default startmenu;