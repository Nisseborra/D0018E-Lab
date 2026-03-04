
import { useNavigate } from "react-router-dom";

export default function Navbar({ user, logout,categories })  {
    const nav = useNavigate();
    //console.log(user)
    function category_direction(ID) {
        console.log("cacategory_direction:", ID)
        const nextState = [user[0],user[1], ID];
        console.log("navbar:", nextState)
        //location.reload();  //reload page
        nav("/catalog", { state: nextState });
        
    }
    return <nav  className="navbar">
        
        <ul>
            <label>Get ride of stuff</label>
            <li><button onClick={()=> nav("/profile",{state: user})} >{user[0]}'s Profile</button></li>
                
                <li><button onClick={logout}>Logg out</button></li>
                <li><button onClick={()=> nav("/item" , {state: user})}>Advertisement</button></li>
                <li><button onClick={()=> nav("/basket", {state: user})}>Basket</button></li>
                <li><button onClick={()=> nav("/selling",{state: user})} >Selling</button></li>
{/* Updated Button */}
<li><button onClick={() => nav("/History", { state: user })}>Bought</button></li>
                <li className="dropdown">
                    <a>category</a>
                        <div className="dropdown-content">
                        <a/>{
                            categories.map((categories,i) => {
                                return (
                                    <div key={i}>
                                    <button onClick={() => category_direction(categories.CATEGORY_ID)}>{categories.TITLE}</button>
                                    </div>
                                );    
                            })
                        } 
                        </div>
                    
                </li>
        </ul>

        
    </nav>

}