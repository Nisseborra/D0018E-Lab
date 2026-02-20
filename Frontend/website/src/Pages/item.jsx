import { useNavigate} from "react-router-dom";
import { socket } from "../../../assets/socket";
import { useEffect , useRef , useState} from "react";
import { useLocation } from "react-router-dom";
export default function item(){
    const nav = useNavigate();
    const location = useLocation();
    const user = location.state;
    console.log(location);
    const [categories, setCategories] = useState([]);

    useEffect(()=> {
        const onUploaded = (msg) => {
        alert(msg);
        nav("/home")            
        }

        socket.emit("category_list");
        const list = (listmap) =>{
            setCategories(listmap);
            
            
        }
        socket.on("category_map", list);
        
        
        socket.on("item_uploaded", onUploaded)

        return () => {
        socket.off("category_map", list);
        
        socket.off("item_uploaded", onUploaded)
        
    };
    },[]);
    //console.log(categories);
    

    function fields(event) {
        
        const title = document.getElementById('title').value;
        const image_1 = document.getElementById('imageUpload1').files[0];
        const image_2 = document.getElementById('imageUpload2').files[0];
        const image_3 = document.getElementById('imageUpload3').files[0];
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const id = user[1];
        if (!title || !description || !price || !image_1) {
            event.preventDefault();
            alert("Fill out all the fields");

            return;
        }
       
        //nav("/home",{state: user})
       
    }





    return(
        <div >
            <h1>
                Create Advertisement
            </h1>

            <div>
                <form action="http://localhost:3000/upload" method="post" encType="multipart/form-data" onSubmit={fields} type="submit">   
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
                    <input type="hidden" name="userId" value={user[1]} />
                    
                    <button  name="" onClick={()=>nav("/home",{state: user}) } >Upload</button>
                </form>   
                <button onClick={()=>nav("/home",{state: user})}>back</button>
               
            </div>
        </div>
    )
}