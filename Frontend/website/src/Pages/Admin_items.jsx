import { socket } from "../../../assets/socket";
import { useEffect } from "react";

import { useState } from "react";

export default function Admin_items({close, admin, categories}) {
 
    const [items, setitems] = useState([]);
 

 
    
    function sold(status){
    if(status ===1){
        return(<div>SOLD</div>)
    }
    if(status === 0){
           return(<div>UNSOLD</div>)
    }
}





     

    useEffect(()=> {
        console.log("get_ITEMS_FRONTEND")
        socket.emit("getitems",(admin));
        
    
   

    
    const retive_item =(item)=>{
        setitems(item)
        console.log("items recicved:", items)
    }
     
         socket.on("retive_item", retive_item )

    
     return () => {
         socket.off("retive_item", retive_item )
       
      
    
    };
       
    }, [])


    function remove_item(item){
        if(confirm(`CONFIRM DELETE ITEM: ${item.TITLE} `) == true){
            if(item.IS_SOLD === 0){
           socket.emit("delete_item", [user, admin]);
            }
            else{
                alert("item is already sold")
                return
            }
        }
        else{
            alert("DIDNT DELETE ITEM")
        }
    }


    if(items.length === 0){
        return(
            <div id="center">
    <h2>ITEMS</h2>
    <h3> NO ITEMS</h3>

   

        <button onClick={()=> close()} >Back</button>
        </div>
        )
    }
    


return(
<div id="center">
    <h2>ITEMS</h2>
<br></br>
    <table>
        <thead>
        <tr>
            <th>ITEM_ID</th>
            <th>TITLE</th>
            <th>PRICE</th>
            <th>IS_SOLD</th>
            <th>CATEGORY</th>
            <th>CREATED BY</th>
            <th>REMOVE</th>
           
        </tr>
        </thead>
        <tbody>
            {Object.values(items).map((item, i) =>
                <tr key ={i}>
                <td>{item.ITEM_ID}</td>
                <td>{item.TITLE}</td>
                <td>{item.PRICE}</td>
                <td>{sold(item.IS_SOLD)}</td>
                <td>{categories[item.CATEGORY_ID -1].TITLE}</td>
                <td>{item.CREATED_BY}</td>
                <td><button onClick={()=> remove_item(item)}>-</button></td>
                </tr>
            )}
        </tbody>
    </table>
   

<button onClick={()=> close()} >Back</button>




</div>
    );

}




