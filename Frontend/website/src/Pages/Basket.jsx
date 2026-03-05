import { socket } from "../../../assets/socket";
import { useLocation } from "react-router";
import { useNavigate} from "react-router";
import { useState } from "react";
import { useEffect } from "react";

/*
basket kassa:
vileken basket id tillhör vilken user

basket item:
 vilket basket id har vilka items

 order:
 checkar ut allt
 tar ut allt från basket item
 tar all de item och ändar det till sold


 vad ska göras:
 går in:
 kallar på basketen
 kollar vilken basket id tillhör user id
 tar basket_id från tabell basket_item o få ut item_id
 tar item_id kallar det från items och kollar att det inte är is_sold
 om den är sold ta bort den från basket_item och säg till
 skriver vilka items som är där

 delete item:
 om man radera item:
 kallar på items_id
 tar bort den från basket_item
 och kallar om basket_item, item_id och items

 pursches:
 ändra item is sold till true
 ta bort alla items från basket_item med basket_id som är kopplat med user_id
 lägger till items i order_items(används för Bought)

 lägga till total beloppet 
 back

 

*/
export default function basket() {
    const nav = useNavigate();
    const location = useLocation();
    const user = location.state;
   


    
    const [items, setitems] = useState([])
    
 



    useEffect(()=> {
        socket.emit("getBasket", user)
        

        const failedbasket =(msg)=>{
            alert(msg)
            nav("/home", {state: user})
        }

        const get_items = (items)=>{
            setitems(items)
        }
        const item_sold = (item)=>{
            alert(item, "is already sold")
        }
        
        const purshed = (msg)=>{
            alert(msg);
            nav("/home",{state: user})
        }

        socket.on("basket_items",get_items)
        socket.on("failed get basket", failedbasket )
        socket.on("item_sold", item_sold);
        socket.on("PURSHES", purshed)

        


     return () => {
          socket.off("basket_items",get_items)
          socket.off("failed get basket", failedbasket )
    
    };
       
    }, [])

    
    const totalprice = Object.values(items).reduce((sum, item) =>{
           return sum + item.PRICE
        }, 0)

    function removeITEM(user, item){
        socket.emit("removeITEM",({user, item}))
    }

    function buy(user, items){
        console.log(user)
         console.log(items)
        socket.emit("buy", ({user, items}))
    }
    


return(
<div id="center">
    <h2>Basket</h2>
<br></br>
    <table>
        <thead>
        <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Remove</th>
           
        </tr>
        </thead>
        <tbody>
            {Object.values(items).map((item, i) =>(
                <tr key ={i}>
                <td>{item.TITLE}</td>
                <td>{item.PRICE}</td>
                <td><button onClick={()=>removeITEM(user, item)}>-</button></td>
             
                
                </tr>
            ))}
        </tbody>
    </table>
    <h2>Total cost: {totalprice}</h2>

<button onClick={()=> nav("/home",{state: user})} >Back</button>
<button onClick={()=>buy(user,items)} >BUY</button>



</div>
    );

}

