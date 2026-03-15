
import { useNavigate} from "react-router-dom";
import { socket } from "../../../assets/socket";
import { useEffect , useRef , useState} from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../component/Navbar";
//creating a table for each product card for the items of the category
export default function  ReviewTable() {
    const nav = useNavigate();
    const location = useLocation();
    const user = location.state;
    const [categories, setCategories] = useState([]);
    const [review, setReview] = useState([]);
    console.log(user);
    
    useEffect(()=> {
        socket.emit("category_list");
        socket.emit("review_template", user[1]);


        const list = (listmap) =>{
            setCategories(listmap); //set the value to categories
        }
        const template = (map) =>{
            setReview(map);           //set the items of said category in a array
        } 

        socket.on("category_map", list);
        socket.on("review_map", template);
        return () => {
            socket.off("category_map", list )
            socket.off("review_map", template);
        };
        
    }, [])
    function logout(){
    nav("/", {state:null})
   }

   return (
    <div>
     <div> <Navbar user={user} logout={logout}  categories={categories}/></div>    
   <div className="container">
   {
    review.map((review,i) => {
        return(
            <div key={i}>  
                    
                <h4>{review.DESCRIPTION}</h4>
            </div>
        )
    })
   }
   
</div>
</div>
   )

}