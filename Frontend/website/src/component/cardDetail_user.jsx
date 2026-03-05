import { useNavigate} from "react-router-dom";
import { socket } from "../../../assets/socket";
export default function  CardDetail({ card, user }) {

     const nav = useNavigate();
console.log("asdsad :",card);
    function additem(user, item){
       
        socket.emit("addBasket", ({user,item}))
        
    }
    
   return <div className="card">
   {
    card.map((card) => {
        return(
        <div >
            <img src={`/uploads/${card.IMAGE_1}`}  alt={`/uploads/produkt.jpg`}/>
                <h2>{card.TITLE}</h2>
                
                <div><h4>{card.TITLE}</h4></div>
                <div><p>{card.DESCRIPTION}</p></div>
                <div>
                    <span>{card.PRICE}</span>
                </div>
                <div>
                    <button onClick={()=>additem(user, card)}>remove</button>
                    <button onClick={()=> nav("/ItemUpdate", {state: user})}>update</button>
                    
                    
                </div>
                

        </div>
        )
    })
   }
   
</div>
}