
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

    function openForm() {
        document.getElementById("myForm").style.display = "block";
    }
    function closeForm() {
        document.getElementById("myForm").style.display = "none";
    }

    return (
    <div>
        <div>
    <nav  className="navbar">
        
        <ul>
            <label>Get ride of stuff</label>
            <li><button onClick={()=> nav("/profile",{state: user})} >{user[0]}'s Profile</button></li>
                
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
                                    <button onClick={() => category_direction(categories.CATEGORY_ID)}>{categories.TITLE}</button>
                                    </div>
                                );    
                            })
                        } 
                        </div>
                    
                </li>

                <li><button onClick={openForm}>Open Form</button></li>
                

        </ul>
        
        
    </nav>
    </div>
    <div className="form-popup" id="myForm">
       
            <h1>Review</h1>
            <label> Description</label>
            <input id="description" placeholder="Description"  maxLength={150}></input> 
            <br />
            <label >rateing</label>
              <label>
    <input type="radio" name="rating" value="1" /> 1
  </label>

    <label>
        <input type="radio" name="rating" value="2" /> 2
    </label>

    <label>
        <input type="radio" name="rating" value="3" /> 3
    </label>

    <label>
        <input type="radio" name="rating" value="4" /> 4
    </label>

    <label>
        <input type="radio" name="rating" value="5" /> 5
    </label>
    <br />
            <button type="submit" className="btn">submit</button>
            <button type="button" className="btn cancel" onClick={closeForm}>Close</button>
     
    </div>
</div>
) 
}