
import { useNavigate } from "react-router-dom";

export default function Navbar({ user, logout,categories })  {
    const nav = useNavigate();
    function category_direction(title) {
        const nextState = [user[0],user[1], title];
        console.log(nextState)
        
        nav("/catalog", { state: nextState });
        
        
        
        
    }
    return <nav  className="navbar">
        
        <ul>
            <label>Get ride of stuff</label>
            <li><a>Loggin as {user[0]} </a></li>
                
                <li><button onClick={logout}>Logg out</button></li>
                <li><button onClick={()=> nav("/item" , {state: user})}>Advertisement</button></li>
                <li><button onClick={()=> nav("/basket", {state: user})}>Basket</button></li>
                <li><button onClick={()=> nav("/selling",{state: user})} >Selling</button></li>
                <li><button >Bought</button></li>
                <li className="dropdown">
                    <a>category</a>
                        <div className="dropdown-content">
                        <a/>{
                            categories.map((categories,i) => {
                                return (
                                    <div key={i}>
                                    <button onClick={() => category_direction(categories.TITLE)}>{categories.TITLE}</button>
                                    </div>
                                );    
                            })
                        } 
                        </div>
                    
                </li>
                
         

                
        </ul>

        
    </nav>

}