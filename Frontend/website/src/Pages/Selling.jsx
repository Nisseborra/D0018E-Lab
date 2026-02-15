import { useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "../../../assets/socket";
import { useLocation } from "react-router-dom";


function sold(status){
    if(status ===1){
        return(<div>SOLD</div>)
    }
    if(status === 0){
           return(<div>UNSOLD</div>)
    }
}





export default function Selling() {
    const nav = useNavigate();
    const location = useLocation();
    const user = location.state;
  



    
    const [items, setitems] = useState([])





    useEffect(()=> {
        socket.emit("get_selling_item", user)
        
         socket.on("retive_selling_item", (items)=>{
            setitems(items)
            
         })



     return () => {
    
    };
       
    }, [])


    

return(
<div id="center">
    <h2>Selling/Sold</h2>
<br></br>
    <table>
        <thead>
        <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Status</th>
            <th>Bought by</th>
        </tr>
        </thead>


       
        <tbody>
            {Object.values(items).map((item, i) =>(
                <tr key ={i}>
                <td>{item.TITLE}</td>
                <td>{item.PRICE}</td>
                <td>{sold(item.IS_SOLD)}</td>
                <td>{item.DESCRIPTION}</td>
                </tr>
            ))}
        </tbody>
    </table>

<button onClick={()=> nav("/home",{state: user})} >Back</button>




</div>
    );

}

//Object.values(sessions).map((room, i) ))}