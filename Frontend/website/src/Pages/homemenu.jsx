
import { useNavigate} from "react-router-dom";
import { socket } from "../../../assets/socket";
import { useEffect , useRef , useState} from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../component/Navbar";


export default function homemenu(){       
       const nav = useNavigate();
       const location = useLocation();
       const user = location.state;

       
       
       const [categories, setCategories] = useState([]);
       const lista=null;
        useEffect(()=> {
            socket.emit("category_list");
                
            const list = (listmap) =>{
                setCategories(listmap);
            }

            const itemsold =(msg)=>{
                alert(msg)
            }

            const item_added = (item)=>{
                alert(item.TITLE, "have been added to your basket")
            }


            socket.on("item_already_sold",itemsold)
            socket.on("item_added",item_added)
    
            socket.on("category_map", list);
            return () => {
                socket.off("category_map", list )
            };
           }, [])

      
   function logout(){
    nav("/", {state:null})
   }
   const found  = categories.find((c) => c.TITLE === "Books")
   //console.log("FOUND; ", found);
   
   
return (
    <Navbar user={user} logout={logout}  categories={categories}/>
)


   


  

}