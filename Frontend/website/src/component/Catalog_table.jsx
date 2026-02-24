//import produkt from "../../../../uploads/produkt.jpg";

import { useNavigate} from "react-router-dom";
import { socket } from "../../../assets/socket";
import { useEffect , useRef , useState} from "react";
import { useLocation } from "react-router-dom";

//creating a table for each product card for the items of the category
export default function  Catalog_table({ template, user }) {
    const nav = useNavigate();
    
    function category_direction(ID) {
        const nextState = [user[0],user[1], ID];
        nav("/ItemCard", { state: nextState });      
    }
    
    function additem(user, item){
        socket.emit("addBasket", ({user,item}))

    }
    
console.log("templete:", template)
   return <div className="container">
   {
    template.map((template,i) => {
        return(
            <div key={i}>
            <img src={`/uploads/${template.IMAGE_1}`}  alt={`/uploads/produkt.jpg`}/>
                <h4><button onClick={()=>category_direction(template.ITEM_ID)}>{template.TITLE}</button></h4>
                
                <div>
                    <span>{template.PRICE}</span>
                </div>
                   <div>
                    <button onClick={()=>additem(user, template)}>add to basket</button>
                    
                </div>
            </div>
        )
    })
   }
   
</div>


}