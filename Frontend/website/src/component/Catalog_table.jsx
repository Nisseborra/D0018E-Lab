//import produkt from "../../../../uploads/produkt.jpg";

import { socket } from "../../../assets/socket"


//creating a table for each product card for the items of the category
export default function  Catalog_table({ template, user }) {
    console.log(template)

    function additem(user, item){
        console.log(user)
        console.log(item)
        socket.emit("addBasket", ({user,item}))

    }

   return <div className="container">
   {
    template.map((template,i) => {
        return(
            <div key={i}>
            <img src={`/uploads/${template.IMAGE_1}`}  alt={`/uploads/produkt.jpg`}/>
                <h4><button>{template.TITLE}</button></h4>
                
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