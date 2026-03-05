import { useNavigate} from "react-router-dom";
import { socket } from "../../../assets/socket";
import { useEffect , useRef , useState} from "react";
import { useLocation } from "react-router-dom";
export default function ItemUpdate(){
    const nav = useNavigate();
    const location = useLocation();
    const user = location.state;
    console.log(location);
    const [categories, setCategories] = useState([]);
    const [card, setCard] = useState([]);
    console.log("test update", user);
    
    useEffect(()=> {
        const onUploaded = (msg) => {
        alert(msg);
        nav("/home")            
        }

        //caategory list 
        socket.emit("category_list");
        socket.emit("card_template",user[2]);
        const list = (listmap) =>{
            setCategories(listmap);
            
            
        }
        const template = (map) =>{
            setCard(map);
        } 

        socket.on("category_map", list);
        socket.on("card", template);
        //socket.on("item_update", onUploaded)

        return () => {
        socket.off("category_map", list);
        socket.off("card", template);
        //socket.off("item_uploaded", onUploaded)
        
    };
    },[]);
    console.log("test update", card);


    //Checks if any of title,description,price and image 1 has been filled
    function fields(event) {
        
        const title = document.getElementById('title').value;
        const image_1 = document.getElementById('imageUpload1').files[0];
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const id = user[1];
        console.log(title);
        
        if (!title || !description || !price || !image_1) {
            event.preventDefault();
            alert("Fill out all the fields");
            nav("/home",{state: user})
            return;
        }
        if (condition) {
            
        }
   
       
        //
       
    }
    return(
        <div >
            <h1>
                ItemUpdate
            </h1>

            <div>
                <form action="http://localhost:3000/update" method="post" encType="multipart/form-data"  type="submit">   
                    <b>Choose an image to upload:</b><br />
                    <input type="file" id="imageUpload1" name="image_1" accept="image/jpeg,image/png,image/jpg"></input>
                
                    <br />
                    <input type="file" id="imageUpload2" name="image_2" accept="image/jpeg,image/png,image/jpg"></input>
                    <br />
                    <input type="file" id="imageUpload3" name="image_3" accept="image/jpeg,image/png,image/jpg"></input>
                    
                    <br />
                    <b>Titel </b> 
                    <input id="title" placeholder="Title" name="title"></input> 
                    
                    <br/>
                    <b> Description</b>
                    <input id="description" placeholder="" name="description"></input> 
                    
                    <br />
                    <label >Choose a Category:</label>
                    <select name="categoryID">{
                    categories.map((categories,i) => {
                        return (
                            <option key={i}  value={categories.CATEGORY_ID}>{categories.TITLE}</option>
                        );    
                    })
                    }</select>

                    <br />
                    <b>Price:</b>
                    <input id="price" type="number" min="1" name="price"></input> <br />
                    <input type="hidden" name="itemId" value={user[2]} />
                    
                    <button  name="" onClick={()=>nav("/home",{state: user}) } >item_update</button>
                </form>   
                <button onClick={()=>nav("/ItemEdit",{state: user})}>back</button>
               
            </div>
        </div>
    )
}