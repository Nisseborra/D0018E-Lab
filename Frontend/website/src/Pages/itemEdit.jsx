import { useNavigate} from "react-router-dom";
import { socket } from "../../../assets/socket";
import { useEffect , useRef , useState} from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../component/Navbar";
import CardDetail_user from "../component/cardDetail_user";
export default function ItemEdit(){
    const nav = useNavigate();
    const location = useLocation();
    const user = location.state;
    const [categories, setCategories] = useState([]);
    const [card, setCard] = useState([]);
    console.log(user);
    
    useEffect(()=> {
        socket.emit("category_list");
        socket.emit("card_template",user[2]);
        const list = (listmap) =>{
            setCategories(listmap);
        }
        const template = (map) =>{
            setCard(map);
        } 
        
        
        const itemadded =(item)=>{
            console.log("added item:", item)
            
            alert((item + " added to basket"))
        }
        const itemerror =(msg)=>{
            console.log("itemerror")
            alert(msg)

        }

        socket.on("item_added", itemadded)
        socket.on("item_error", itemerror)

        socket.on("category_map", list);
        socket.on("card", template);
        return () => {
            socket.off("category_map", list )
            socket.off("card", template);
            socket.off("item_added", itemadded)
           socket.off("item_error", itemerror)
        };
        
    }, [])
    function logout(){
    nav("/", {state:null})
   }
   //console.log(card);
   
    return(
        <div >
            <div><h1>MUDASIR</h1></div>
            <div> <Navbar user={user} logout={logout}  categories={categories}/></div>
            <div><CardDetail_user card={card} user={user} /></div>
        </div>
    )
}