import { useNavigate} from "react-router-dom";
import { socket } from "../../../assets/socket";
import { useEffect , useRef , useState} from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../component/Navbar";
import Catalog_table from "../component/Catalog_table";

export default function catalog(){   
    const nav = useNavigate();
    const location = useLocation();
    const user = location.state;
    const [categories, setCategories] = useState([]);
    const [item, setItem] = useState([]);
    const [user_id, setuserid] = useState(0)
    const lista=null;
 
    
    
    useEffect(()=> {
        
        console.log(user)
        console.log(user[1])
        socket.emit("category_list");
        socket.emit("category_template");//temporary checks only id 0 for categiry id 
        const list = (listmap) =>{
            setCategories(listmap);
        }
        const template = (listmap) =>{
            setItem(listmap);
        }

        const itemadded =(item)=>{
            alert(item.TITLE,"added to basket")
        }
        const itemerror =(msg)=>{
            alert(msg)

        }
    
        socket.on("category_map", list);
        socket.on("template_map", template);
          console.log("items:",item)
        socket.on("item_addded", itemadded)
        socket.on("item_error", itemerror)
        return () => {
            socket.off("category_map", list )
            socket.off("template_map", template);
             socket.off("item_addded", itemadded)
        socket.off("item_error", itemerror)
        };
    }, [])
    function logout(){
    nav("/", {state:null})
   }
    return (
        <div>
        <div>
        <Navbar user={user} logout={logout}  categories={categories}/>
        </div>
        <div><Catalog_table template={item} user={user} /></div>
        </div>
        
    )
}